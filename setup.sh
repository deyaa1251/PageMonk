#!/bin/bash

# PageMonk Setup Script

echo "🚀 Setting up PageMonk..."

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama is not installed."
    echo "📥 Please install Ollama from https://ollama.ai/"
    echo "   Then run: ollama pull qwen2.5:0.5b"
    exit 1
fi

# Set up Python virtual environment
echo "🐍 Setting up Python virtual environment..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

cd ..

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd frontend
npm install

cd ..

# Pull Ollama model if not already present
echo "🤖 Checking Ollama model..."
if ! ollama list | grep -q "qwen2.5:0.5b"; then
    echo "📥 Pulling Qwen2.5:0.5b model..."
    ollama pull qwen2.5:0.5b
else
    echo "✅ Qwen2.5:0.5b model already available"
fi

echo "✅ Setup complete!"
echo ""
echo "To start PageMonk:"
echo "  ./start.sh"
echo ""
echo "Or manually:"
echo "  1. Backend: cd backend && source venv/bin/activate && python -m uvicorn app.main:app --reload"
echo "  2. Frontend: cd frontend && npm start"