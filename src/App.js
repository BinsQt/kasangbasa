import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './main/Dashboard';
import Header from './partials/Header';
import Module from './main/Module';
import VoiceOverSelect from './main/VoiceOverSelect';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/voice-over-select/:moduleId" element={isAuthenticated ? <VoiceOverSelect /> : <Navigate to="/" />} />
          <Route path="/module/:id" element={isAuthenticated ? <Module /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
