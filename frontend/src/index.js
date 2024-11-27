import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Importando como padrão
import HomePage from './pages/HomePage';    // Importando HomePage como padrão
import ProcessPage from './pages/ProcessPage';    // Importando HomePage como padrão
import UserRegistrationForm from './pages/UserRegistrationForm';
import ProcessDetailsPage from './pages/ProcessDetailsPage';    // Importando HomePage como padrão
import PersonPage from './pages/PersonPage';
import PersonDetailsPage from './pages/PersonDetailsPage';
import SearchPage from './pages/SearchPage';
import TaskManagementPage from './pages/TaskManagementPage';
import PaymentsPage from './pages/PaymentsPage';
import DocumentManagementPage from './pages/DocumentManagementPage';
import Notifications from './pages/Notifications';
import AutomationPage from './pages/AutomationPage';
import DashboardPage from './pages/DashboardPage';
import ProcessRegisterPage from './pages/ProcessRegisterPage';
import EditProcessPage from './pages/EditProcessPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/registration" element={<UserRegistrationForm />} />
      <Route path="/processpage" element={<ProcessPage />} />
      <Route path="/processdetails" element={<ProcessDetailsPage />} />
      <Route path="/personpage" element={<PersonPage />} />
      <Route path="/persondetails" element={<PersonDetailsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/tasks" element={<TaskManagementPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/documents" element={<DocumentManagementPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/automation" element={<AutomationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/processregister" element={<ProcessRegisterPage />} />
      <Route path="/processupdate" element={<ProcessRegisterPage />} />
    </Routes>
  </Router>
);