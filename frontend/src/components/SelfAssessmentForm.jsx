import React, { useState } from 'react';
import styles from './ReviewForms.module.css';

// Компонент формы самооценки (Self‑Assessment Form)
const SelfAssessmentForm = () => {
  // Состояние для хранения списка задач
  // Изначально содержит одну пустую задачу с полями:
  // - id: уникальный идентификатор задачи
  // - description: описание результата по задаче
  // - personalContribution: личный вклад и влияние на результат
  // - takeaways: выводы/приобретённые знания
  // - nextTime: что сделать иначе в следующий раз
  // - teamwork: оценка взаимодействия с коллегами (0–10)
  // - satisfaction: удовлетворённость выполнением (0–10)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: '',
      personalContribution: '',
      takeaways: '',
      nextTime: '',
      teamwork: 0,
      satisfaction: 0
    }
  ]);

  // Функция для обновления конкретного поля конкретной задачи
  // Параметры:
  // - id: идентификатор задачи, которую нужно обновить
  // - field: название поля (ключа), которое нужно изменить
  // - value: новое значение для поля
  const handleTaskChange = (id, field, value) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, [field]: value } // Если id совпадает — обновляем нужное поле
          : t // Иначе оставляем задачу без изменений
      )
    );
  };

  // Функция для добавления новой задачи в список
  // Новая задача получает id на основе длины текущего массива + 1
  // Все поля инициализируются пустыми значениями/нулями
  const addTask = () => {
    setTasks(prev => [
      ...prev,
      {
        id: prev.length + 1,
        description: '',
        personalContribution: '',
        takeaways: '',
        nextTime: '',
        teamwork: 0,
        satisfaction: 0
      }
    ]);
  };

  return (
    <div className={styles.formBlock}>
      <h2>Самооценка</h2>

      {/* Отображение списка задач. Для каждой задачи создаётся блок с полями ввода */}
      {tasks.map((task, index) => (
        <div key={task.id} className={styles.taskBlock}>
          <label>
            1. Опиши результат по задаче:
            <textarea
              value={task.description}
              onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
            />
          </label>
          <label>
            2. Личный вклад и влияние на общий результат:
            <textarea
              value={task.personalContribution}
              onChange={(e) => handleTaskChange(task.id, 'personalContribution', e.target.value)}
            />
          </label>
          <label>
            3. Что ты забираешь с собой по результатам:
            <textarea
              value={task.takeaways}
              onChange={(e) => handleTaskChange(task.id, 'takeaways', e.target.value)}
            />
          </label>
          <label>
            4. Что в следующий раз будешь делать по‑другому:
            <textarea
              value={task.nextTime}
              onChange={(e) => handleTaskChange(task.id, 'nextTime', e.target.value)}
            />
          </label>
          <label>
            5. Оценка взаимодействия с коллегами (0–10):
            <input
              type="number"
              min="0"
              max="10"
              value={task.teamwork}
              onChange={(e) => handleTaskChange(task.id, 'teamwork', e.target.value)}
            />
          </label>
          <label>
            6. Общая удовлетворённость выполнением задачи (0–10):
            <input
              type="number"
              min="0"
              max="10"
              value={task.satisfaction}
              onChange={(e) => handleTaskChange(task.id, 'satisfaction', e.target.value)}
            />
          </label>
        </div>
      ))}

      {/* Кнопка для добавления новой задачи */}
      <button onClick={addTask}>+ Добавить задачу</button>
    </div>
  );
};

export default SelfAssessmentForm;
