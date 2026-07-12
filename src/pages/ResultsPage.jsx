/* src/pages/ResultsPage.jsx */

import React from 'react';
import { useAuth } from '../context/AuthContext';

// ИСПРАВЛЕНО НА ЕДИНСТВЕННОЕ ЧИСЛО:
import styles from './ResultsPage.module.css'; 

const ResultsPage = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Подведение итогов</h1>
      
      {user ? (
        <>
          <p style={{ textAlign: 'center', color: '#ccc' }}>
            Результаты для: <strong>{user.name}</strong>
          </p>
          
          {/* Статичные карточки */}
          <div className={styles.cards}>
            <div className={styles.card}>
              <h2>Суммарный балл</h2>
              <p>90 / 100</p>
            </div>
            <div className={styles.card}>
              <h2>Рейтинг</h2>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'lime' }}>Отличный</p>
            </div>
            <div className={styles.card}>
              <h2>Рекомендации</h2>
              <p>Так держать!</p>
            </div>
          </div>
        </>
      ) : (
        <p style={{ textAlign: 'center', color: 'red' }}>Ошибка загрузки профиля.</p>
      )}

      <div className={styles.managerSection}>
        <h2>Решение руководителя</h2>
        <p><i>Форма ввода отключена для теста.</i></p>
      </div>
    </div>
  );
};

export default ResultsPage;