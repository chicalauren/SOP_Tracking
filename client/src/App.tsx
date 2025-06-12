import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SopDetail from './pages/SopDetail';
import QuizPage from './pages/QuizPage';
import AuthPage from './pages/AuthPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sop/:id' element={<SopDetail />} />
        <Route path='/sop/:id/quiz' element={<QuizPage />} />
        <Route path='/employees' element={<EmployeesPage />} />
      </Routes>
    </Router>
  );
}

export default App;