/* src/pages/AnalyticsPage.jsx */

import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useAnalytics } from '../hooks/useAnalytics'; 
import styles from './AnalyticsPage.module.css';

const AnalyticsPage = ({ 
  selfAssessment = {}, 
  peerFeedback = [], 
  managerReview = {}, 
  potentialAssessment = {} 
}) => {
  const { user } = useAuth();

  // Хук возвращает готовый объект со всеми расчетами
  const analytics = useAnalytics({
    selfAssessment,
    peerFeedback,
    managerReview,
    potentialAssessment
  });

  // Цвет текста рейтинга зависит от значения
  const getRatingColor = () => {
    if (analytics.rating === 3) return '#4caf50'; 
    if (analytics.rating === 2) return '#ff9800'; 
    if (analytics.rating === 1) return '#ff5722'; 
    return '#9e9e9e'; 
  };

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <h1>Итоги оценки</h1>
      {user && (
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px' }}>
          Аналитика для: <strong>{user?.name}</strong>
        </p>
      )}

      {/* Карточки с результатами */}
      {/* Проверено: используется стиль cardContainer */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2>Суммарный балл</h2>
          {/* Используем maxScore из хука, если он там есть, иначе фиксированное значение */}
          <p>{analytics.totalScore} / {analytics.maxScore || 100}</p>
        </div>

        <div className={styles.card}>
          <h2>Рейтинг</h2>
          <p style={{ color: getRatingColor(), fontSize: '24px', fontWeight: 'bold' }}>
            {['Низкий', 'Средний', 'Хороший', 'Отличный'][analytics.rating]}
          </p>
        </div>

        <div className={styles.card}>
          <h2>Рекомендации</h2>
          <p>{analytics.recommendations || 'Недостаточно данных для рекомендаций.'}</p>
        </div>
      </div>

      {/* Детальные рекомендации */}
      <div className={styles.recommendations}>
        <h2>Зоны развития</h2>
        <p>Система проанализировала ответы и выделила следующие направления:</p>
        <ul>
          <li>Развивайте профессиональные компетенции согласно плану.</li>
          <li>Работайте над зонами улучшения из обратной связи коллег.</li>
          <li>Используйте обратную связь руководителя для роста.</li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;