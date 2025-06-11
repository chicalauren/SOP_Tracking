import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SopDetail from './pages/SopDetail';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/sop/:id' element={<SopDetail />} />
        <Route path='/sop/:id/quiz' element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;