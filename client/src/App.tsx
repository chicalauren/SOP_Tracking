import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Dashboard from "./pages/Dashboard";
import SopDetail from "./pages/SopDetail";
import QuizPage from "./pages/QuizPage";
import AuthPage from "./pages/AuthPage";
import EmployeesPage from "./pages/EmployeesPage";
import client from "./services/apollo";
import { SOPList } from "./components/SopList";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <h1>SOP Tracker</h1>
          <SOPList /> {/* Now this will render */}
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sop/:id" element={<SopDetail />} />
            <Route path="/sop/:id/quiz" element={<QuizPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
