import React, { useState } from 'react';
import styles from './ReviewForms.module.css';

const ManagerReviewForm = () => {
  const [feedback, setFeedback] = useState({
    taskRating: 0,
    qualities: '',
    personalContribution: '',
    interaction: 0,
    improvement: '',
    overallRating: 0
  });

  const handleChange = (field, value) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.formBlock}>
      <h2>Оценка руководителя</h2>
      <label>
        1. Насколько удалось достичь результатов:
        <input type="number" min="0" max="10" value={feedback.taskRating} onChange={(e) => handleChange('taskRating', e.target.value)} />
      </label>
      <label>
        2. Личные качества сотрудника:
        <textarea value={feedback.qualities} onChange={(e) => handleChange('qualities', e.target.value)} />
      </label>
      <label>
        3. Личный вклад руководителя:
        <textarea value={feedback.personalContribution} onChange={(e) => handleChange('personalContribution', e.target.value)} />
      </label>
      <label>
        4. Качество взаимодействия по общей оценке коллег:
        <input type="number" min="0" max="10" value={feedback.interaction} onChange={(e) => handleChange('interaction', e.target.value)} />
      </label>
      <label>
        5. Что порекомендуешь улучшить:
        <textarea value={feedback.improvement} onChange={(e) => handleChange('improvement', e.target.value)} />
      </label>
      <label>
        6. Общий рейтинг сотрудника:
        <input type="number" min="0" max="10" value={feedback.overallRating} onChange={(e) => handleChange('overallRating', e.target.value)} />
      </label>
    </div>
  );
};

export default ManagerReviewForm;
