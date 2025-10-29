// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalsPage';
import ReviewsPage from './pages/ReviewsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/final-results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
