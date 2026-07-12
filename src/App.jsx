/* src/App.jsx */

import React, { useState } from 'react';
// Роутинг
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Компоненты
import Navbar from './components/Navbar';
import GoalForm from './components/GoalForm';

// Страницы
import GoalsPage from './pages/GoalsPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResultsPage from './pages/ResultsPage';
import ReviewsPage from './pages/ReviewsPage';

// Провайдеры и стили
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App = () => {
  // Состояние для формы ввода (на главной)
  const [goals, setGoals] = useState([
    {
      id: 'goal-1',
      name: 'Цель 1',
      deadline: '15.08.2025',
      results: 'Достижение KPI',
      tasks: [
        { id: 'task-1', text: 'Подготовить отчет' },
        { id: 'task-2', text: 'Провести встречу' }
      ]
    }
  ]);

  const addGoal = () => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      name: '',
      deadline: '',
      results: '',
      tasks: [],
      adding: true
    };
    setGoals([newGoal, ...goals]);
  };

  const removeGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateGoal = (updatedGoal) => {
    setGoals(prev =>
      prev.map(g => g.id === updatedGoal.id ? updatedGoal : g)
    );
  };

  return (
    /* ОБЕРТКА В ПРОВАЙДЕР АВТОРИЗАЦИИ */
    <AuthProvider>
      <Router>
        {/* Навигация видна на всех страницах */}
        <Navbar />
        
        {/* Контейнер с отступом под навбар */}
        <div className="container" style={{ paddingTop: '70px' }}>
          <Routes>
            
            {/* ГЛАВНАЯ СТРАНИЦА - ФОРМА ВВОДА ЦЕЛЕЙ */}
            <Route path="/" element={
              <>
                <p className="note">Добавьте цели, заполнив форму ниже.</p>
                
                {goals.map(goal => (
                  <GoalForm
                    key={goal.id}
                    goal={goal}
                    setGoals={updateGoal}
                    removeGoal={removeGoal}
                  />
                ))}
                
                <button className="addGoalBtn" onClick={addGoal}>+ Новая цель</button>
              </>
            } />

            {/* СТРАНИЦА УПРАВЛЕНИЯ ЦЕЛЯМИ (HR / Менеджер) */}
            <Route path="/goals" element={<GoalsPage />} />

            {/* ДАШБОРД КОМАНДЫ */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* АНАЛИТИКА КОНКРЕТНОГО СОТРУДНИКА */}
            <Route path="/analytics" element={
              <AnalyticsPage 
                selfAssessment={{ satisfaction: 8, teamwork: 9 }}
                peerFeedback={[{ taskFeedback: 7, interaction: 8 }]}
                managerReview={{ overallRating: 4 }}
                potentialAssessment={{ leadership: 6 }}
              />
            } />

            {/* ПОДВЕДЕНИЕ ИТОГОВ */}
            <Route path="/results" element={<ResultsPage />} />

            {/* РАЗДЕЛ ОТЗЫВОВ И ОЦЕНОК */}
            <Route path="/reviews" element={<ReviewsPage />} />

            {/* Защита от неверных адресов */}
            <Route path="*" element={<h1>Страница не найдена</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;