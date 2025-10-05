# PageMonk API Examples

This file contains examples of how to use the PageMonk API programmatically.

## Prerequisites

Make sure PageMonk is running:
```bash
./start.sh
```

## Python Examples

### Upload and Parse a Document

```python
import requests
import time
import json

# API base URL
BASE_URL = "http://localhost:8000"

# Upload a document
def upload_document(file_path):
    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(f"{BASE_URL}/upload", files=files)
        return response.json()

# Parse document to markdown
def parse_document(document_id):
    response = requests.post(f"{BASE_URL}/parse/{document_id}")
    return response.json()

# Get document details
def get_document(document_id):
    response = requests.get(f"{BASE_URL}/documents/{document_id}")
    return response.json()

# Example usage
if __name__ == "__main__":
    # Upload document
    print("Uploading document...")
    doc = upload_document("example.pdf")
    doc_id = doc['id']
    print(f"Document uploaded with ID: {doc_id}")
    
    # Parse document
    print("Parsing document...")
    parse_result = parse_document(doc_id)
    print("Parse initiated:", parse_result)
    
    # Wait for processing to complete
    while True:
        doc_details = get_document(doc_id)
        status = doc_details['processing_status']
        print(f"Status: {status}")
        
        if status == 'completed':
            print("Processing completed!")
            print("Markdown content:")
            print(doc_details['markdown_content'])
            break
        elif status == 'failed':
            print("Processing failed!")
            break
        
        time.sleep(2)
```

### Create and Use Schema for Extraction

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Create a schema
def create_schema(name, description, schema_def):
    schema_data = {
        "name": name,
        "description": description,
        "schema_definition": schema_def
    }
    response = requests.post(f"{BASE_URL}/schemas", json=schema_data)
    return response.json()

# Extract data using schema
def extract_with_schema(document_id, schema_id):
    response = requests.post(f"{BASE_URL}/extract/{document_id}?schema_id={schema_id}")
    return response.json()

# Example: Create contact extraction schema
contact_schema = {
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string"
}

schema = create_schema(
    "Contact Information",
    "Extract contact details from documents", 
    contact_schema
)
print("Created schema:", schema)

# Use schema to extract from document (assuming document_id=1)
extracted_data = extract_with_schema(1, schema['id'])
print("Extracted data:", extracted_data)
```

## cURL Examples

### Upload Document
```bash
curl -X POST "http://localhost:8000/upload" \
  -F "file=@document.pdf"
```

### Parse Document
```bash
curl -X POST "http://localhost:8000/parse/1"
```

### Get Document Details
```bash
curl -X GET "http://localhost:8000/documents/1"
```

### Create Schema
```bash
curl -X POST "http://localhost:8000/schemas" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Invoice Data",
    "description": "Extract invoice information",
    "schema_definition": {
      "invoice_number": "string",
      "date": "string",
      "total_amount": "number",
      "vendor": "string"
    }
  }'
```

### Extract with Schema
```bash
curl -X POST "http://localhost:8000/extract/1?schema_id=1"
```

### List All Documents
```bash
curl -X GET "http://localhost:8000/documents"
```

### List All Schemas
```bash
curl -X GET "http://localhost:8000/schemas"
```

## JavaScript/Node.js Examples

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const BASE_URL = 'http://localhost:8000';

// Upload document
async function uploadDocument(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  
  const response = await axios.post(`${BASE_URL}/upload`, form, {
    headers: form.getHeaders()
  });
  
  return response.data;
}

// Parse document
async function parseDocument(documentId) {
  const response = await axios.post(`${BASE_URL}/parse/${documentId}`);
  return response.data;
}

// Create schema
async function createSchema(name, description, schemaDef) {
  const response = await axios.post(`${BASE_URL}/schemas`, {
    name,
    description,
    schema_definition: schemaDef
  });
  
  return response.data;
}

// Example usage
async function main() {
  try {
    // Upload and parse document
    const doc = await uploadDocument('example.pdf');
    console.log('Document uploaded:', doc.id);
    
    await parseDocument(doc.id);
    console.log('Document parsing initiated');
    
    // Create extraction schema
    const schema = await createSchema(
      'Contact Info',
      'Extract contact details',
      {
        name: 'string',
        email: 'string',
        phone: 'string'
      }
    );
    
    console.log('Schema created:', schema.id);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

main();
```

## Response Formats

### Document Response
```json
{
  "id": 1,
  "filename": "example.pdf",
  "markdown_content": "# Document Title\n\nContent here...",
  "structured_content": "# Document Title\n\nContent here...",
  "extracted_schema": null,
  "upload_date": "2023-12-01T10:00:00.000Z",
  "file_size": 102400,
  "file_type": "application/pdf",
  "processing_status": "completed"
}
```

### Schema Response
```json
{
  "id": 1,
  "name": "Contact Information",
  "description": "Extract contact details",
  "schema_definition": {
    "name": "string",
    "email": "string",
    "phone": "string"
  },
  "created_date": "2023-12-01T10:00:00.000Z",
  "is_active": true
}
```

### Extraction Response
```json
{
  "extracted_data": "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"phone\": \"+1-555-0123\"}"
}
```

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 400: Bad Request (invalid input)
- 404: Not Found (document/schema doesn't exist)
- 500: Internal Server Error

Error responses include a detail message:
```json
{
  "detail": "Document not found"
}
```