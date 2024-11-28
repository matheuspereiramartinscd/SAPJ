import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Importando como padrão
import HomePage from './pages/HomePage';    // Importando HomePage como padrão
import ProcessPage from './pages/ProcessPage';    // Importando HomePage como padrão
import UserRegistrationForm from './pages/UserRegistrationForm';
import ProcessDetailsPage from './pages/ProcessDetailsPage';    // Importando HomePage como padrão
import PersonPage from './pages/PersonPage';

import SearchPage from './pages/SearchPage';
import TaskManagementPage from './pages/TaskManagementPage';
import PaymentsPage from './pages/PaymentsPage';
import DocumentManagementPage from './pages/DocumentManagementPage';
import Notifications from './pages/Notifications';
import AutomationPage from './pages/AutomationPage';
import DashboardPage from './pages/DashboardPage';
import ProcessRegisterPage from './pages/ProcessRegisterPage';
import EditProcessPage from './pages/EditProcessPage';
import EditPersonPage from './pages/EditPersonPage';
import EditTaskPage from './pages/EditTaskPage';
import PersonRegisterPage from './pages/PersonRegisterPage'; // Importando a nova página de cadastro de pessoa
import PersonDetailsPage from './pages/PersonDetailPage'; // Importando a nova página de detalhes de pessoa
import TaskRegisterPage from './pages/TaskRegisterPage';

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

      <Route path="/processdetails/:id" element={<ProcessDetailsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/tasks" element={<TaskManagementPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/documents" element={<DocumentManagementPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/automation" element={<AutomationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/processregister" element={<ProcessRegisterPage />} />
      <Route path="/processes/details/:id" element={<ProcessDetailsPage />} />
      <Route path="/process/edit/:id" element={<EditProcessPage />} />
      <Route path="pessoas/edit/:id" element={<EditPersonPage />} />
      <Route path="/tasks/edit/:taskId" element={<EditTaskPage />} />

      {/* Nova rota para registro de pessoa */}
      <Route path="/personregister" element={<PersonRegisterPage />} />
      <Route path="/taskregister" element={<TaskRegisterPage />} />

      {/* Nova rota para detalhes de pessoa */}
      <Route path="/persondetails/:id" element={<PersonDetailsPage />} />
    </Routes>
  </Router>
);
