import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SopDetail from './pages/SopDetail';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/sop/:id' component={SopDetail} />
        <Route path='/sop/:id/quiz' component={QuizPage} />
      </Switch>
    </Router>
  );
}

export default App;
