import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Parse from './pages/Parse';
import Extract from './pages/Extract';
import Documents from './pages/Documents';
import Schemas from './pages/Schemas';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-black transition-colors duration-300">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
          />
          
          {/* Main Content Area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Header */}
            <Header 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            
            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 bg-black">
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route path="/parse" element={<Parse darkMode={darkMode} />} />
                <Route path="/extract" element={<Extract darkMode={darkMode} />} />
                <Route path="/documents" element={<Documents darkMode={darkMode} />} />
                <Route path="/schemas" element={<Schemas darkMode={darkMode} />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;