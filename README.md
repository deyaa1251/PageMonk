# PageMonk# PageMonk 🧠📄



![PageMonk Logo](https://via.placeholder.com/300x100/6366f1/ffffff?text=PageMonk)**Transform your documents into structured, intelligent data with AI-powered processing**



A sophisticated document intelligence platform inspired by LlamaIndex and designed with modern aesthetics following TailAdmin and Hex.tech's design language. PageMonk transforms complex document processing into an intuitive, AI-powered experience.PageMonk is a modern document processing platform inspired by LlamaIndex, featuring a beautiful UI design following Hex.tech's aesthetic principles. It combines advanced OCR capabilities with LLM-powered content structuring to transform any document into clean, searchable markdown and structured data.



## ✨ Features![PageMonk Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=PageMonk+Demo)



### 🔍 Intelligent Document Processing## ✨ Key Features

- **OCR Layer Integration**: Advanced optical character recognition using pytesseract

- **AI-Powered Structuring**: Ollama Qwen2.5:0.5b model for intelligent content organization- **🤖 AI-Powered OCR**: Advanced document processing using Docling with intelligent text extraction and structure recognition

- **Multi-Format Support**: PDF, images, and various document formats- **📝 Smart Content Structuring**: LLM-powered markdown generation using Ollama Qwen2.5:0.5b for clean, organized output  

- **Markdown Output**: Clean, structured markdown generation- **🎯 Custom Schema Extraction**: User-defined data extraction patterns for any document type

- **🎨 Beautiful Modern UI**: Clean, intuitive interface inspired by Hex.tech design principles

### 📊 Schema-Based Data Extraction- **⚡ Real-time Processing**: Instant document processing with live status updates

- **Custom Schema Creation**: Define extraction templates for any document type- **🔗 API-First Design**: RESTful API for easy integration and automation

- **Flexible Field Types**: Support for text, numbers, dates, and complex structures

- **Real-time Processing**: Instant extraction with live preview## 🏗️ Architecture

- **Export Capabilities**: JSON, CSV, and custom format downloads

```

### 🎨 Modern Design System┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐

- **TailAdmin/Hex.tech Inspired**: Sophisticated, data-focused interface│   React Frontend │────│   FastAPI Backend │────│   Ollama LLM    │

- **Dark Mode Support**: System-aware theme switching with manual override│   (Port 3000)   │    │   (Port 8000)    │    │   (Qwen2.5:0.5b)│

- **Responsive Design**: Mobile-first approach with desktop optimization└─────────────────┘    └──────────────────┘    └─────────────────┘

- **Component Architecture**: Modular, reusable UI components                                │

- **Accessibility First**: WCAG AAA compliance with keyboard navigation                       ┌──────────────────┐

                       │   SQLite DB      │

### 🚀 Performance & User Experience                       │   (Documents &   │

- **Real-time Updates**: Live processing status and progress tracking                       │    Schemas)      │

- **Drag & Drop**: Intuitive file upload with visual feedback                       └──────────────────┘

- **Smart Navigation**: Contextual breadcrumbs and sidebar navigation```

- **Loading States**: Sophisticated skeleton screens and progress indicators

**Tech Stack:**

## 🏗️ Technical Architecture- **Backend**: FastAPI, SQLAlchemy, Docling OCR, Ollama

- **Frontend**: React, Tailwind CSS, Axios, React Markdown

### Backend (FastAPI)- **Database**: SQLite for simplicity and portability

- **REST API**: Comprehensive endpoints for all operations- **AI**: Ollama with Qwen2.5:0.5b model for content processing

- **SQLAlchemy ORM**: Robust database operations with SQLite

- **Async Processing**: Non-blocking document processing## 🚀 Quick Start

- **Error Handling**: Comprehensive error management and logging

### Prerequisites

### Frontend (React)

- **Modern React 18**: Latest features and performance optimizations- Python 3.8+

- **Tailwind CSS**: Utility-first styling with custom design system- Node.js 16+

- **Component Library**: @heroicons/react, @tailwindcss/forms, @tailwindcss/typography- [Ollama](https://ollama.ai/) installed

- **State Management**: React hooks and context for application state

- **Routing**: React Router with protected routes and navigation### One-Command Setup



### AI & Processing```bash

- **Ollama Integration**: Local LLM processing with Qwen2.5:0.5b# Make the startup script executable and run

- **OCR Engine**: pytesseract for text extractionchmod +x start.sh

- **Document Parsing**: PyPDF2 and Pillow for file handling./start.sh

- **Content Analysis**: Intelligent document structure recognition```



## 🚀 Quick StartThis will:

1. Install and pull the Qwen2.5:0.5b model

### Prerequisites2. Start the Ollama service

- Python 3.8+3. Launch the backend server

- Node.js 16+4. Start the frontend development server

- Ollama installed with Qwen2.5:0.5b model

The application will be available at:

### Installation- **Frontend**: http://localhost:3000

- **Backend API**: http://localhost:8000

1. **Clone the repository**- **API Docs**: http://localhost:8000/docs

```bash

git clone https://github.com/yourusername/PageMonk.git### Manual Setup

cd PageMonk

```<details>

<summary>Click to expand manual setup instructions</summary>

2. **Backend Setup**

```bash1. **Install Ollama and pull the model:**

# Install Python dependencies```bash

pip install -r requirements.txt# Install Ollama from https://ollama.ai/

ollama pull qwen2.5:0.5b

# Start the FastAPI serverollama serve  # Start Ollama service

cd backend```

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

```2. **Set up the backend:**

```bash

3. **Frontend Setup**cd backend

```bashpip install -r requirements.txt

# Install Node.js dependenciespython -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

cd frontend```

npm install

3. **Set up the frontend:**

# Start the React development server```bash

npm startcd frontend

```npm install

npm start

4. **Ollama Setup**```

```bash

# Install Ollama (if not already installed)</details>

curl -fsSL https://ollama.ai/install.sh | sh

## 📱 Usage Guide

# Pull the Qwen2.5:0.5b model

ollama pull qwen2.5:0.5b### 1. Document Parsing

```- **Upload**: Drag & drop or browse to upload PDF/image files

- **Process**: Click "Parse" to extract and structure content using AI

### Access Points- **View**: See the generated markdown output in real-time

- **Frontend Application**: http://localhost:3000- **Export**: Download the structured content

- **Backend API**: http://localhost:8000

- **API Documentation**: http://localhost:8000/docs### 2. Schema Extraction

- **Create Schemas**: Define custom JSON extraction patterns

## 📁 Project Structure- **Apply**: Use schemas on processed documents

- **Extract**: Get structured data matching your patterns

```- **Export**: Save extracted data for further processing

PageMonk/

├── backend/                 # FastAPI backend application### 3. API Integration

│   ├── app/Access the full REST API for automation:

│   │   ├── main.py         # Main FastAPI application```bash

│   │   ├── database.py     # SQLAlchemy models and database# Upload document

│   │   ├── processor.py    # Document processing logiccurl -X POST "http://localhost:8000/upload" -F "file=@document.pdf"

│   │   └── models.py       # Pydantic schemas

│   └── requirements.txt    # Python dependencies# Parse document

├── frontend/               # React frontend applicationcurl -X POST "http://localhost:8000/parse/1"

│   ├── src/

│   │   ├── components/     # Reusable UI components# Create extraction schema

│   │   │   ├── layout/     # Layout components (Sidebar, Header)curl -X POST "http://localhost:8000/schemas" \

│   │   │   └── ui/         # Base UI components  -H "Content-Type: application/json" \

│   │   ├── pages/          # Application pages  -d '{"name": "Contact Info", "description": "Extract contacts", "schema_definition": {"name": "string", "email": "string"}}'

│   │   │   ├── Home.js     # Dashboard with stats and quick actions```

│   │   │   ├── Parse.js    # Document upload and processing

│   │   │   ├── Extract.js  # Schema-based data extraction## 🎨 UI Features

│   │   │   ├── Documents.js # Document management

│   │   │   └── Schemas.js  # Schema managementThe interface follows modern design principles inspired by Hex.tech:

│   │   ├── App.js          # Main application component

│   │   └── index.css       # Global styles and design system- **Clean Typography**: Inter font family for excellent readability

│   ├── tailwind.config.js  # Tailwind configuration- **Thoughtful Color Palette**: Purple-blue gradient with careful contrast

│   └── package.json        # Node.js dependencies- **Smooth Animations**: Subtle fade-ins and transitions

├── DESIGN_SYSTEM.md        # Comprehensive design documentation- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

└── README.md               # This file- **Intuitive Workflow**: Clear visual hierarchy and user flow

```

## 🔧 Development

## 🎨 Design System

### Backend Development

PageMonk features a comprehensive design system inspired by modern data analytics platforms. Key highlights include:```bash

cd backend

- **Color Palette**: Sophisticated indigo/purple gradient scheme with semantic colorspip install -r requirements.txt

- **Typography**: Inter font family with optimized scales and spacingpython -m uvicorn app.main:app --reload

- **Component Library**: 50+ reusable components with consistent API```

- **Dark Mode**: Full dark mode support with intelligent color adaptation

- **Responsive Design**: Mobile-first approach with desktop enhancements### Frontend Development

```bash

For detailed design guidelines, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).cd frontend

npm install

## 📊 API Endpointsnpm start

```

### Documents

- `GET /documents` - List all documents### Project Structure

- `POST /documents` - Upload new document```

- `GET /documents/{id}` - Get document detailsPageMonk/

- `DELETE /documents/{id}` - Delete document├── backend/

│   ├── app/

### Schemas│   │   ├── main.py          # FastAPI application

- `GET /schemas` - List all schemas│   │   ├── database.py      # SQLAlchemy models

- `POST /schemas` - Create new schema│   │   ├── models.py        # Pydantic schemas

- `PUT /schemas/{id}` - Update schema│   │   └── processor.py     # Document processing logic

- `DELETE /schemas/{id}` - Delete schema│   └── requirements.txt

├── frontend/

### Processing│   ├── src/

- `POST /parse` - Parse document with OCR and AI│   │   ├── components/      # React components

- `POST /extract` - Extract data using schema│   │   ├── pages/          # Page components

│   │   └── services/       # API services

For complete API documentation, visit http://localhost:8000/docs when running the backend.│   ├── package.json

│   └── tailwind.config.js

## 🔧 Configuration└── start.sh                # Quick start script

```

### Environment Variables

```bash## 🤝 Contributing

# Backend Configuration

DATABASE_URL=sqlite:///./documents.dbWe welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

OLLAMA_BASE_URL=http://localhost:11434

DEFAULT_MODEL=qwen2.5:0.5b## 📄 License



# Frontend ConfigurationMIT License - see [LICENSE](LICENSE) file for details.

REACT_APP_API_URL=http://localhost:8000

```---



### Customization**Made with ❤️ for the document processing community**

- **Theme Colors**: Modify `tailwind.config.js` for custom color schemes
- **Component Styles**: Update `/src/index.css` for global style changes
- **API Endpoints**: Configure base URL in frontend for different environments

## 🤝 Contributing

We welcome contributions to PageMonk! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: TailAdmin and Hex.tech for sophisticated UI patterns
- **AI Processing**: Ollama community for local LLM capabilities
- **UI Components**: Heroicons for beautiful iconography
- **Framework**: FastAPI and React communities for excellent documentation

## 📞 Support

- **Documentation**: [Design System Guide](./DESIGN_SYSTEM.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/PageMonk/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/PageMonk/discussions)

---

<div align="center">
  <p>Built with ❤️ for intelligent document processing</p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-design-system">Design System</a> •
    <a href="#-api-endpoints">API</a>
  </p>
</div>