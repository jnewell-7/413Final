import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EntertainersPage from './pages/EntertainersPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entertainers" element={<EntertainersPage />} />
        <Route path="/entertainer/:entertainerID" element={<EntertainerDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
