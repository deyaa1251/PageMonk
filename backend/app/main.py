from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os
import shutil
from typing import List, Optional
import json

from database import get_db, Document, Schema
from models import DocumentResponse, SchemaCreate, SchemaResponse, ParseRequest, StructureRequest
from processor import processor

app = FastAPI(title="PageMonk", description="Document parsing and extraction service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
async def root():
    return {"message": "Welcome to PageMonk - Document Processing API"}

@app.post("/upload", response_model=DocumentResponse)
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload a document for processing"""
    
    # Save uploaded file
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Get file size
    file_size = os.path.getsize(file_path)
    
    # Create database record
    db_document = Document(
        filename=file.filename,
        file_size=file_size,
        file_type=file.content_type or "unknown",
        processing_status="uploaded"
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    return db_document

@app.post("/parse/{document_id}")
async def parse_document(
    document_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Parse document to markdown using OCR and LLM structuring"""
    
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Update status
    document.processing_status = "processing"
    db.commit()
    
    try:
        file_path = f"uploads/{document.filename}"
        
        # Extract text using OCR
        raw_content = await processor.extract_text_with_ocr(file_path)
        document.original_content = raw_content
        
        # Structure using LLM
        structured_content = await processor.structure_with_llm(raw_content)
        document.markdown_content = structured_content
        document.structured_content = structured_content
        
        document.processing_status = "completed"
        
    except Exception as e:
        document.processing_status = "failed"
        document.structured_content = f"Processing failed: {str(e)}"
    
    db.commit()
    return {"message": "Document processed", "status": document.processing_status}

@app.post("/extract/{document_id}")
async def extract_with_schema(
    document_id: int,
    schema_id: int,
    db: Session = Depends(get_db)
):
    """Extract information from document using a predefined schema"""
    
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
        
    schema = db.query(Schema).filter(Schema.id == schema_id).first()
    if not schema:
        raise HTTPException(status_code=404, detail="Schema not found")
    
    if not document.original_content:
        raise HTTPException(status_code=400, detail="Document not yet processed")
    
    try:
        # Parse schema definition if it's a string
        schema_def = schema.schema_definition
        if isinstance(schema_def, str):
            schema_def = json.loads(schema_def)
            
        # Extract using schema
        extracted_data = await processor.extract_with_schema(
            document.original_content, 
            schema_def
        )
        
        document.extracted_schema = extracted_data
        db.commit()
        
        return {"extracted_data": extracted_data}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")

@app.get("/documents", response_model=List[DocumentResponse])
async def get_documents(db: Session = Depends(get_db)):
    """Get all documents"""
    documents = db.query(Document).all()
    return documents

@app.get("/documents/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: int, db: Session = Depends(get_db)):
    """Get a specific document"""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@app.delete("/delete_all_documents")
async def delete_all_document(db: Session = Depends(get_db)):
    count = db.query(Document).delete()
    db.query(Document).delete()
    db.commit()
    return {f"Deleted {count} documents"}

@app.post("/schemas", response_model=SchemaResponse)
async def create_schema(schema: SchemaCreate, db: Session = Depends(get_db)):
    """Create a new extraction schema"""
    db_schema = Schema(
        name=schema.name,
        description=schema.description,
        schema_definition=json.dumps(schema.schema_definition)
    )
    db.add(db_schema)
    db.commit()
    db.refresh(db_schema)
    
    # Return the created schema with parsed definition
    return {
        "id": db_schema.id,
        "name": db_schema.name,
        "description": db_schema.description,
        "schema_definition": json.loads(db_schema.schema_definition),
        "created_date": db_schema.created_date,
        "is_active": db_schema.is_active
    }

@app.get("/schemas", response_model=List[SchemaResponse])
async def get_schemas(db: Session = Depends(get_db)):
    """Get all schemas"""
    schemas = db.query(Schema).filter(Schema.is_active == True).all()
    # Convert JSON strings back to dicts
    for schema in schemas:
        if isinstance(schema.schema_definition, str):
            schema.schema_definition = json.loads(schema.schema_definition)
    return schemas

@app.get("/schemas/{schema_id}", response_model=SchemaResponse)
async def get_schema(schema_id: int, db: Session = Depends(get_db)):
    """Get a specific schema"""
    schema = db.query(Schema).filter(Schema.id == schema_id).first()
    if not schema:
        raise HTTPException(status_code=404, detail="Schema not found")
    # Convert JSON string back to dict
    if isinstance(schema.schema_definition, str):
        schema.schema_definition = json.loads(schema.schema_definition)
    return schema

@app.delete("/schemas/{schema_id}")
async def delete_schema(schema_id: int, db: Session = Depends(get_db)):
    """Delete a schema"""
    schema = db.query(Schema).filter(Schema.id == schema_id).first()
    if not schema:
        raise HTTPException(status_code=404, detail="Schema not found")
    
    schema.is_active = False
    db.commit()
    return {"message": "Schema deleted"}

@app.post("/structure")
async def structure_content(request: StructureRequest):
    """Structure raw content using LLM"""
    try:
        structured = await processor.structure_with_llm(request.content, request.instructions)
        return {"structured_content": structured}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Structuring failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)