import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './components/Chat';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/imoveis" element={<Properties />} />
                <Route path="/imovel/:id" element={<PropertyDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Chat Widget */}
            <Chat isOpen={showChat} onToggle={() => setShowChat(!showChat)} />
          </div>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;