#!/bin/bash

echo "🚀 Starting PageMonk Application..."
echo

# Start the backend server
echo "📊 Starting Backend (FastAPI)..."
cd /home/opensource/PageMonk
source venv/bin/activate
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start the frontend server  
echo "🎨 Starting Frontend (React)..."
cd /home/opensource/PageMonk/frontend
npm start &
FRONTEND_PID=$!

echo
echo "✅ PageMonk is starting up!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
wait $BACKEND_PID $FRONTEND_PID