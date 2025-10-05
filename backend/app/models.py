from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class DocumentUpload(BaseModel):
    filename: str
    file_type: str

class DocumentResponse(BaseModel):
    id: int
    filename: str
    markdown_content: Optional[str] = None
    structured_content: Optional[str] = None
    extracted_schema: Optional[str] = None
    upload_date: datetime
    file_size: int
    file_type: str
    processing_status: str

    class Config:
        from_attributes = True

class SchemaCreate(BaseModel):
    name: str
    description: str
    schema_definition: Dict[str, Any]

class SchemaResponse(BaseModel):
    id: int
    name: str
    description: str
    schema_definition: Dict[str, Any]
    created_date: datetime
    is_active: bool

    class Config:
        from_attributes = True

class ParseRequest(BaseModel):
    document_id: int
    parse_type: str = Field(..., description="'markdown' or 'schema'")
    schema_id: Optional[int] = None

class StructureRequest(BaseModel):
    content: str
    instructions: Optional[str] = "Structure this content in a clear, organized markdown format"