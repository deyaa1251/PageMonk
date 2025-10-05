#!/bin/bash

# PageMonk Startup Script

echo "🚀 Starting PageMonk..."

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama is not installed. Please run setup.sh first or install from https://ollama.ai/"
    exit 1
fi

# Check if the model is available
if ! ollama list | grep -q "qwen2.5:0.5b"; then
    echo "📥 Pulling Qwen2.5:0.5b model..."
    ollama pull qwen2.5:0.5b
fi

# Start Ollama service in background (if not already running)
if ! pgrep -x "ollama" > /dev/null; then
    echo "🤖 Starting Ollama service..."
    ollama serve &
    sleep 5
fi

# Check if backend dependencies are installed
if [ ! -d "backend/venv" ]; then
    echo "❌ Backend virtual environment not found. Please run setup.sh first."
    exit 1
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "❌ Frontend dependencies not found. Please run setup.sh first."
    exit 1
fi

# Start backend
echo "🔧 Starting backend server..."
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 8

# Start frontend
echo "🎨 Starting frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ PageMonk is running!"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo ""
echo "🔍 Features:"
echo "   - Upload & parse documents (PDF, JPG, PNG)"
echo "   - AI-powered content structuring"
echo "   - Custom schema extraction"
echo "   - Beautiful modern UI"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup processes
cleanup() {
    echo ""
    echo "🛑 Stopping PageMonk services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Set trap for cleanup
trap cleanup INT TERM

# Wait for user interrupt
wait