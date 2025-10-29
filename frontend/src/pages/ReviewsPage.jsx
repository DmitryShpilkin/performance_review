import React, { useState } from 'react';
// Импорт тестовых форм
import SelfAssessmentForm from '../components/SelfAssessmentForm';
import PeerFeedbackForm from '../components/PeerFeedbackForm';
import ManagerReviewForm from '../components/ManagerReviewForm';
import PotentialAssessmentForm from '../components/PotentialAssessmentForm';
// Импорт стилей для страницы
import styles from './ReviewPage.module.css';

const ReviewPage = ({ role = 'employee' }) => {
  // =========================
  // Состояние раскрытых секций
  // expandedSections - объект, где ключи - секции, а значения true/false (раскрыта/закрыта)
  // =========================
  const [expandedSections, setExpandedSections] = useState({
    self: false,      // Самооценка
    peer: false,      // Обратная связь коллег
    manager: false,   // Оценка руководителя
    potential: false, // Потенциал сотрудника
  });

  // =========================
  // Функция переключения состояния секции
  // =========================
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={styles.pageContainer}>
      {/* Заголовок страницы */}
      <h1 className={styles.pageTitle}>Обзор обратной связи и оценок</h1>

      {/* =========================
          Секция: Самооценка
          ========================= */}
      <div className={styles.section}>
        {/* Кнопка для раскрытия/сворачивания */}
        <button className={styles.toggleBtn} onClick={() => toggleSection('self')}>
          Самооценка {expandedSections.self ? '▲' : '▼'}
        </button>
        {/* Контент секции с анимацией */}
        <div className={`${styles.sectionContent} ${expandedSections.self ? styles.open : ''}`}>
          {/* Тестовая форма */}
          {expandedSections.self && <SelfAssessmentForm />}
          {/* Для реальных данных (раскомментировать при подключении) */}
          {/* {expandedSections.self && <SelfAssessmentForm data={realSelfData} />} */}
        </div>
      </div>

      {/* =========================
          Секция: Обратная связь коллег
          ========================= */}
      <div className={styles.section}>
        <button className={styles.toggleBtn} onClick={() => toggleSection('peer')}>
          Обратная связь коллег {expandedSections.peer ? '▲' : '▼'}
        </button>
        <div className={`${styles.sectionContent} ${expandedSections.peer ? styles.open : ''}`}>
          {expandedSections.peer && <PeerFeedbackForm />}
          {/* {expandedSections.peer && <PeerFeedbackForm data={realPeerData} />} */}
        </div>
      </div>

      {/* =========================
          Секция: Оценка руководителя
          ========================= */}
      <div className={styles.section}>
        <button className={styles.toggleBtn} onClick={() => toggleSection('manager')}>
          Оценка руководителя {expandedSections.manager ? '▲' : '▼'}
        </button>
        <div className={`${styles.sectionContent} ${expandedSections.manager ? styles.open : ''}`}>
          {expandedSections.manager && <ManagerReviewForm />}
          {/* {expandedSections.manager && <ManagerReviewForm data={realManagerData} />} */}
        </div>
      </div>

      {/* =========================
          Секция: Потенциал сотрудника
          ========================= */}
      <div className={styles.section}>
        <button className={styles.toggleBtn} onClick={() => toggleSection('potential')}>
          Потенциал сотрудника {expandedSections.potential ? '▲' : '▼'}
        </button>
        <div className={`${styles.sectionContent} ${expandedSections.potential ? styles.open : ''}`}>
          {expandedSections.potential && <PotentialAssessmentForm />}
          {/* {expandedSections.potential && <PotentialAssessmentForm data={realPotentialData} />} */}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
