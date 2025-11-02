import React, { useState } from 'react';
import styles from './ReviewForms.module.css';

/**
 * Компонент формы оценки сотрудника руководителем
 * В дальнейшем данные можно будет отправлять на backend через API
 */
const ManagerReviewForm = () => {
  // =========================
  // Состояние формы
  // =========================
  const [feedback, setFeedback] = useState({
    taskRating: 0,           // оценка достижения задач
    qualities: '',           // текст про личные качества
    personalContribution: '',// вклад руководителя
    interaction: 0,          // оценка взаимодействия
    improvement: '',         // рекомендации по улучшению
    overallRating: 0         // общий рейтинг сотрудника
  });

  // =========================
  // Обработчик изменения полей
  // =========================
  const handleChange = (field, value) => {
    // Обновляем состояние формы динамически по имени поля
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.formBlock}>
      <h2>Оценка руководителя</h2>

      {/* Оценка достижения результатов */}
      <label>
        1. Насколько удалось достичь результатов:
        <input
          type="number"
          min="0"
          max="10"
          value={feedback.taskRating}
          onChange={(e) => handleChange('taskRating', e.target.value)}
        />
      </label>

      {/* Личные качества */}
      <label>
        2. Личные качества сотрудника:
        <textarea
          value={feedback.qualities}
          onChange={(e) => handleChange('qualities', e.target.value)}
        />
      </label>

      {/* Вклад руководителя */}
      <label>
        3. Личный вклад руководителя:
        <textarea
          value={feedback.personalContribution}
          onChange={(e) => handleChange('personalContribution', e.target.value)}
        />
      </label>

      {/* Взаимодействие с коллегами */}
      <label>
        4. Качество взаимодействия по общей оценке коллег:
        <input
          type="number"
          min="0"
          max="10"
          value={feedback.interaction}
          onChange={(e) => handleChange('interaction', e.target.value)}
        />
      </label>

      {/* Рекомендации по улучшению */}
      <label>
        5. Что порекомендуешь улучшить:
        <textarea
          value={feedback.improvement}
          onChange={(e) => handleChange('improvement', e.target.value)}
        />
      </label>

      {/* Общий рейтинг */}
      <label>
        6. Общий рейтинг сотрудника:
        <input
          type="number"
          min="0"
          max="10"
          value={feedback.overallRating}
          onChange={(e) => handleChange('overallRating', e.target.value)}
        />
      </label>
    </div>
  );
};

export default ManagerReviewForm;
