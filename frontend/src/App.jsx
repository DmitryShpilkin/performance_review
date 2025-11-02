import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalsPage';
import ReviewsPage from './pages/ReviewsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResultsPage from './pages/ResultsPage';

function App() {

  // ✅ Проверка связи с backend
  useEffect(() => {
    fetch("http://localhost:4000/api/ping")
      .then(res => res.json())
      .then(data => console.log("Ответ сервера:", data))
      .catch(err => console.error("Ошибка связи с backend:", err));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/final-results" element={<ResultsPage />} />
      </Routes>
    </>
  );
}

export default App;
