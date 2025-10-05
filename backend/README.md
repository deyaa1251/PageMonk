# PageMonk Backend

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Install Ollama and pull the model:
```bash
# Install Ollama from https://ollama.ai/
ollama pull qwen2.5:0.5b
```

4. Run the server:
```bash
cd app
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `POST /upload` - Upload a document
- `POST /parse/{document_id}` - Parse document to markdown
- `POST /extract/{document_id}?schema_id={id}` - Extract with schema
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document
- `POST /schemas` - Create extraction schema
- `GET /schemas` - List all schemas
- `POST /structure` - Structure raw content