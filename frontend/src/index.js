import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Importando como padrão
import HomePage from './pages/HomePage';    // Importando HomePage como padrão
import ProcessPage from './pages/ProcessPage';    // Importando HomePage como padrão
import UserRegistrationForm from './pages/UserRegistrationForm';
import ProcessDetailsPage from './pages/ProcessDetailsPage';    // Importando HomePage como padrão
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/registration" element={<UserRegistrationForm />} />
      <Route path="/processpage" element={<ProcessPage />} />
      <Route path="/process" element={<ProcessDetailsPage />} />
    </Routes>
  </Router>
);