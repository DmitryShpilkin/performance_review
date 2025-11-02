import React, { useState } from 'react';
import styles from './ReviewForms.module.css'; 

const SelfAssessmentForm = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: '', personalContribution: '', takeaways: '', nextTime: '', teamwork: 0, satisfaction: 0 }
  ]);

  const handleTaskChange = (id, field, value) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addTask = () => {
    setTasks(prev => [...prev, { id: prev.length + 1, description: '', personalContribution: '', takeaways: '', nextTime: '', teamwork: 0, satisfaction: 0 }]);
  };

  return (
    <div className={styles.formBlock}>
      <h2>Самооценка</h2>
      {tasks.map((task, index) => (
        <div key={task.id} className={styles.taskBlock}>
          <label>
            1. Опиши результат по задаче:
            <textarea value={task.description} onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)} />
          </label>
          <label>
            2. Личный вклад и влияние на общий результат:
            <textarea value={task.personalContribution} onChange={(e) => handleTaskChange(task.id, 'personalContribution', e.target.value)} />
          </label>
          <label>
            3. Что ты забираешь с собой по результатам:
            <textarea value={task.takeaways} onChange={(e) => handleTaskChange(task.id, 'takeaways', e.target.value)} />
          </label>
          <label>
            4. Что в следующий раз будешь делать по-другому:
            <textarea value={task.nextTime} onChange={(e) => handleTaskChange(task.id, 'nextTime', e.target.value)} />
          </label>
          <label>
            5. Оценка взаимодействия с коллегами (0-10):
            <input type="number" min="0" max="10" value={task.teamwork} onChange={(e) => handleTaskChange(task.id, 'teamwork', e.target.value)} />
          </label>
          <label>
            6. Общая удовлетворенность выполнением задачи (0-10):
            <input type="number" min="0" max="10" value={task.satisfaction} onChange={(e) => handleTaskChange(task.id, 'satisfaction', e.target.value)} />
          </label>
        </div>
      ))}

      <button onClick={addTask}>+ Добавить задачу</button>
    </div>
  );
};

export default SelfAssessmentForm;
