import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';    // Importando HomePage como padrão
import HomePage from './pages/UserRegistrationForm';    // Importando HomePage como padrão

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/registration" element={<UserRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
