# PageMonk 🧠📄

<div align="center">

![PageMonk Banner](https://via.placeholder.com/1200x300/6366f1/ffffff?text=PageMonk+-+AI+Document+Intelligence)

**Transform your documents into structured, intelligent data with AI-powered processing**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18-61dafb.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)](https://fastapi.tiangolo.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-usage-guide) • [API](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

PageMonk is a modern document intelligence platform that combines advanced OCR capabilities with LLM-powered content structuring. Inspired by LlamaIndex and designed with Hex.tech's aesthetic principles, PageMonk transforms any document into clean, searchable markdown and structured data.

### Why PageMonk?

- **AI-First**: Leverages Ollama's Qwen2.5 for intelligent content understanding
- **Developer-Friendly**: Clean REST API with comprehensive documentation
- **Beautiful UI**: Modern, intuitive interface that makes document processing enjoyable
- **Self-Hosted**: Run everything locally with full control over your data
- **Flexible**: Custom schema extraction for any document type

---

## ✨ Features

### 🤖 Intelligent Processing
- **Advanced OCR**: Powered by Docling for accurate text extraction and structure recognition
- **AI Structuring**: LLM-powered markdown generation using Ollama Qwen2.5:0.5b
- **Multi-Format Support**: Process PDFs, images, and various document formats seamlessly

### 🎯 Custom Data Extraction
- **Schema Builder**: Define custom extraction templates for any document type
- **Flexible Fields**: Support for text, numbers, dates, and complex nested structures
- **Real-Time Processing**: Instant extraction with live preview and status updates

### 🎨 Modern Interface
- **Hex.tech Inspired**: Clean, data-focused design with beautiful typography
- **Dark Mode**: Full dark mode support with system-aware theme switching
- **Responsive**: Perfect experience across desktop, tablet, and mobile devices
- **Accessibility**: WCAG AAA compliant with full keyboard navigation

### ⚡ Developer Experience
- **REST API**: Comprehensive endpoints for easy integration
- **Auto Documentation**: Interactive API docs at `/docs`
- **Type Safety**: Full TypeScript support in frontend
- **Easy Setup**: One-command installation and startup

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  React Frontend │────│  FastAPI Backend │────│   Ollama LLM    │
│   (Port 3000)   │    │   (Port 8000)    │    │  (Qwen2.5:0.5b) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                       ┌──────────────────┐
                       │   SQLite DB      │
                       │  (Documents &    │
                       │    Schemas)      │
                       └──────────────────┘
```

**Tech Stack:**
- **Backend**: FastAPI, SQLAlchemy, Docling OCR, Ollama
- **Frontend**: React 18, Tailwind CSS, Axios, React Router
- **Database**: SQLite for simplicity and portability
- **AI**: Ollama with Qwen2.5:0.5b model

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** 
- **Node.js 16+**
- **[Ollama](https://ollama.ai/)** installed

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/PageMonk.git
cd PageMonk

# Make the startup script executable and run
chmod +x start.sh
./start.sh
```

This script will:
1. Install and pull the Qwen2.5:0.5b model
2. Start the Ollama service
3. Launch the backend server
4. Start the frontend development server

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 📖 Usage Guide

### 1. Document Parsing

```bash
# Upload a document via CLI
curl -X POST "http://localhost:8000/documents" \
  -F "file=@document.pdf"

# Or use the web interface
# 1. Navigate to http://localhost:3000
# 2. Drag & drop your document
# 3. Click "Parse" to process
```

**The AI will:**
- Extract text using advanced OCR
- Identify document structure (headings, lists, tables)
- Generate clean, formatted markdown
- Preserve semantic meaning

### 2. Schema Extraction

Create custom extraction patterns for your documents:

```json
{
  "name": "Invoice Extractor",
  "description": "Extract invoice details",
  "schema_definition": {
    "invoice_number": "string",
    "date": "date",
    "total": "number",
    "items": [
      {
        "description": "string",
        "amount": "number"
      }
    ]
  }
}
```

Apply schemas via API or UI to extract structured data automatically.

### 3. API Integration

```python
import requests

# Upload document
with open('document.pdf', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/documents',
        files={'file': f}
    )
doc_id = response.json()['id']

# Parse document
requests.post(f'http://localhost:8000/parse/{doc_id}')

# Get parsed content
content = requests.get(f'http://localhost:8000/documents/{doc_id}')
print(content.json()['markdown_content'])
```

---

## 📊 API Endpoints

### Documents
- `GET /documents` - List all documents with pagination
- `POST /documents` - Upload new document
- `GET /documents/{id}` - Get document details and content
- `DELETE /documents/{id}` - Delete document
- `POST /parse/{id}` - Parse document with AI

### Schemas
- `GET /schemas` - List all extraction schemas
- `POST /schemas` - Create new schema
- `GET /schemas/{id}` - Get schema details
- `PUT /schemas/{id}` - Update schema
- `DELETE /schemas/{id}` - Delete schema
- `POST /extract` - Extract data using schema

For complete interactive documentation, visit http://localhost:8000/docs

---

## 🔧 Manual Setup

<details>
<summary>Click to expand manual setup instructions</summary>

### 1. Install Ollama and Model

```bash
# Install Ollama from https://ollama.ai/
curl -fsSL https://ollama.ai/install.sh | sh

# Pull the model
ollama pull qwen2.5:0.5b

# Start Ollama service
ollama serve
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Environment Variables (Optional)

Create `.env` files for custom configuration:

**Backend `.env`:**
```bash
DATABASE_URL=sqlite:///./documents.db
OLLAMA_BASE_URL=http://localhost:11434
DEFAULT_MODEL=qwen2.5:0.5b
```

**Frontend `.env`:**
```bash
REACT_APP_API_URL=http://localhost:8000
```

</details>

---

## 📁 Project Structure

```
PageMonk/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── database.py        # SQLAlchemy models
│   │   ├── models.py          # Pydantic schemas
│   │   └── processor.py       # Document processing logic
│   └── requirements.txt
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/        # Layout components
│   │   │   └── ui/            # Base UI components
│   │   ├── pages/             # Application pages
│   │   │   ├── Home.js        # Dashboard
│   │   │   ├── Parse.js       # Document parsing
│   │   │   ├── Extract.js     # Schema extraction
│   │   │   ├── Documents.js   # Document management
│   │   │   └── Schemas.js     # Schema management
│   │   ├── services/          # API services
│   │   └── App.js             # Main component
│   ├── tailwind.config.js
│   └── package.json
├── start.sh                    # Quick start script
└── README.md
```

---

## 🎨 Design System

PageMonk features a comprehensive design system inspired by modern data platforms:

- **Typography**: Inter font family with optimized scales
- **Colors**: Sophisticated indigo/purple gradient with semantic meanings
- **Components**: 50+ reusable components with consistent API
- **Animations**: Subtle, purposeful transitions for better UX
- **Accessibility**: WCAG AAA compliant with keyboard navigation

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration**: [Hex.tech](https://hex.tech) for UI/UX patterns
- **AI Processing**: [Ollama](https://ollama.ai) community for local LLM capabilities
- **OCR Engine**: [Docling](https://github.com/DS4SD/docling) for document understanding
- **Icons**: [Heroicons](https://heroicons.com) for beautiful iconography

---

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/PageMonk/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/PageMonk/discussions)
- **Documentation**: Check our [Wiki](https://github.com/yourusername/PageMonk/wiki)

---

<div align="center">

**Made with ❤️ for the document processing community**

⭐ Star us on GitHub if you find PageMonk useful!

</div>
