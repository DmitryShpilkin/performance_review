import React, { useState } from 'react';
import styles from './ReviewForms.module.css';

const PeerFeedbackForm = () => {
  const [respondents, setRespondents] = useState([
    { id: 1, name: '', taskFeedback: '', qualities: '', interaction: 0, improvement: '' }
  ]);

  const handleChange = (id, field, value) => {
    setRespondents(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRespondent = () => {
    setRespondents(prev => [...prev, { id: prev.length + 1, name: '', taskFeedback: '', qualities: '', interaction: 0, improvement: '' }]);
  };

  return (
    <div className={styles.formBlock}>
      <h2>Обратная связь от коллег</h2>
      {respondents.map((r, index) => (
        <div key={r.id} className={styles.taskBlock}>
          <label>
            Выберите респондента:
            <input type="text" value={r.name} onChange={(e) => handleChange(r.id, 'name', e.target.value)} />
          </label>
          <label>
            1. Насколько удалось достичь результата по задаче:
            <input type="number" min="0" max="10" value={r.taskFeedback} onChange={(e) => handleChange(r.id, 'taskFeedback', e.target.value)} />
          </label>
          <label>
            2. Какие личные качества помогли коллеге:
            <textarea value={r.qualities} onChange={(e) => handleChange(r.id, 'qualities', e.target.value)} />
          </label>
          <label>
            3. Оцени качество взаимодействия (0-10):
            <input type="number" min="0" max="10" value={r.interaction} onChange={(e) => handleChange(r.id, 'interaction', e.target.value)} />
          </label>
          <label>
            4. Что можно улучшить:
            <textarea value={r.improvement} onChange={(e) => handleChange(r.id, 'improvement', e.target.value)} />
          </label>
        </div>
      ))}
      <button onClick={addRespondent}>+ Добавить респондента</button>
    </div>
  );
};

export default PeerFeedbackForm;
