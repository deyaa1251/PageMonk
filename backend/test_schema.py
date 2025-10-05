#!/usr/bin/env python3

import sys
import os
sys.path.append('/home/opensource/PageMonk/backend')

import json
from app.database import engine, get_db, Schema
from sqlalchemy.orm import Session

def test_schema_creation():
    # Create a database session
    db = Session(bind=engine)
    
    try:
        # Test schema creation
        test_schema = Schema(
            name="Test Schema",
            description="A test schema",
            schema_definition=json.dumps({"field1": "string", "field2": "number"})
        )
        
        db.add(test_schema)
        db.commit()
        db.refresh(test_schema)
        
        print(f"Schema created successfully!")
        print(f"ID: {test_schema.id}")
        print(f"Name: {test_schema.name}")
        print(f"Description: {test_schema.description}")
        print(f"Schema definition: {test_schema.schema_definition}")
        print(f"Created date: {test_schema.created_date}")
        
        # Test parsing the JSON back
        parsed_def = json.loads(test_schema.schema_definition)
        print(f"Parsed definition: {parsed_def}")
        
        # Create return object like in the API
        result = {
            "id": test_schema.id,
            "name": test_schema.name,
            "description": test_schema.description,
            "schema_definition": json.loads(test_schema.schema_definition),
            "created_at": test_schema.created_date
        }
        
        print(f"API-like result: {result}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    test_schema_creation()