#!/usr/bin/env python3

"""
PageMonk Demo Script

This script demonstrates the core functionality of PageMonk:
1. Document upload
2. AI-powered parsing to markdown
3. Schema creation
4. Data extraction

Prerequisites:
- PageMonk backend running on localhost:8000
- A sample document file (PDF, JPG, or PNG)
"""

import requests
import time
import json
import sys
import os

BASE_URL = "http://localhost:8000"

def check_server():
    """Check if PageMonk server is running"""
    try:
        response = requests.get(BASE_URL)
        return response.status_code == 200
    except:
        return False

def upload_document(file_path):
    """Upload a document to PageMonk"""
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return None
    
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f)}
        response = requests.post(f"{BASE_URL}/upload", files=files)
        
    if response.status_code == 200:
        return response.json()
    else:
        print(f"❌ Upload failed: {response.text}")
        return None

def parse_document(document_id):
    """Parse document to markdown"""
    response = requests.post(f"{BASE_URL}/parse/{document_id}")
    return response.status_code == 200

def get_document(document_id):
    """Get document details"""
    response = requests.get(f"{BASE_URL}/documents/{document_id}")
    if response.status_code == 200:
        return response.json()
    return None

def create_demo_schema():
    """Create a demo extraction schema"""
    schema_data = {
        "name": "Demo Contact Schema",
        "description": "Extract contact information for demo purposes",
        "schema_definition": {
            "name": "string",
            "email": "string", 
            "phone": "string",
            "company": "string",
            "address": "string"
        }
    }
    
    response = requests.post(f"{BASE_URL}/schemas", json=schema_data)
    if response.status_code == 200:
        return response.json()
    return None

def extract_with_schema(document_id, schema_id):
    """Extract data using schema"""
    response = requests.post(f"{BASE_URL}/extract/{document_id}?schema_id={schema_id}")
    if response.status_code == 200:
        return response.json()
    return None

def main():
    print("🚀 PageMonk Demo Script")
    print("=" * 50)
    
    # Check if server is running
    if not check_server():
        print("❌ PageMonk server is not running!")
        print("   Please start it with: ./start.sh")
        return
    
    print("✅ PageMonk server is running")
    
    # Get file path from user
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    else:
        file_path = input("📄 Enter path to document file (PDF/JPG/PNG): ").strip()
    
    if not file_path:
        print("❌ No file specified")
        return
    
    # Step 1: Upload document
    print(f"\n📤 Uploading document: {file_path}")
    document = upload_document(file_path)
    if not document:
        return
    
    doc_id = document['id']
    print(f"✅ Document uploaded successfully (ID: {doc_id})")
    
    # Step 2: Parse document
    print(f"\n🔍 Parsing document with AI...")
    if not parse_document(doc_id):
        print("❌ Failed to start parsing")
        return
    
    # Wait for processing
    print("⏳ Processing document (this may take a moment)...")
    max_attempts = 30
    attempt = 0
    
    while attempt < max_attempts:
        doc_details = get_document(doc_id)
        if not doc_details:
            print("❌ Failed to get document details")
            return
        
        status = doc_details['processing_status']
        
        if status == 'completed':
            print("✅ Document processed successfully!")
            print(f"\n📝 Generated Markdown (first 500 chars):")
            print("-" * 50)
            content = doc_details.get('markdown_content', 'No content generated')
            print(content[:500] + ("..." if len(content) > 500 else ""))
            print("-" * 50)
            break
        elif status == 'failed':
            print("❌ Document processing failed")
            return
        elif status == 'processing':
            print(f"   Still processing... ({attempt + 1}/{max_attempts})")
        
        time.sleep(2)
        attempt += 1
    
    if attempt >= max_attempts:
        print("⏰ Processing timeout - document may still be processing")
        return
    
    # Step 3: Create demo schema
    print(f"\n🛠️  Creating demo extraction schema...")
    schema = create_demo_schema()
    if not schema:
        print("❌ Failed to create schema")
        return
    
    schema_id = schema['id']
    print(f"✅ Schema created successfully (ID: {schema_id})")
    
    # Step 4: Extract data using schema
    print(f"\n🎯 Extracting data using schema...")
    extracted = extract_with_schema(doc_id, schema_id)
    if extracted:
        print("✅ Data extraction completed!")
        print(f"\n📊 Extracted Data:")
        print("-" * 50)
        try:
            # Pretty print the JSON
            extracted_data = json.loads(extracted['extracted_data'])
            print(json.dumps(extracted_data, indent=2, ensure_ascii=False))
        except:
            print(extracted['extracted_data'])
        print("-" * 50)
    else:
        print("❌ Data extraction failed")
    
    print(f"\n🎉 Demo completed successfully!")
    print(f"   You can view more details at: http://localhost:3000")
    print(f"   API docs available at: http://localhost:8000/docs")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Demo interrupted by user")
    except Exception as e:
        print(f"\n❌ Demo failed with error: {e}")
        sys.exit(1)