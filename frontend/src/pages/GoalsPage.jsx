import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GoalForm from '../components/GoalForm';
import styles from './GoalsPage.module.css';

const GoalsPage = () => {

  // =========================
  // ТЕСТОВЫЕ ДАННЫЕ
  // =========================
  const [goals, setGoals] = useState([
    { 
      id: uuidv4(), 
      name: 'Цель 1', 
      deadline: '', 
      results: '', 
      tasks: [{ id: uuidv4(), text: '' }], 
      adding: false 
    },
    { 
      id: uuidv4(), 
      name: 'Цель 2', 
      deadline: '', 
      results: '', 
      tasks: [{ id: uuidv4(), text: '' }], 
      adding: false 
    },
  ]);

  // =========================
  // РЕАЛЬНЫЕ ДАННЫЕ
  // =========================
  /*
  const [goals, setGoals] = useState([]); // сюда потом будут приходить реальные цели пользователя
  */

  // Добавление новой цели
  const addGoal = () => {
    if (goals.length < 5) {
      const newGoal = {
        id: uuidv4(),
        name: `Цель ${goals.length + 1}`,
        deadline: '',
        results: '',
        tasks: [{ id: uuidv4(), text: '', adding: true }],
        adding: true,
      };
      setGoals([...goals, newGoal]);
      setTimeout(() => {
        setGoals(prev => prev.map(g => g.id === newGoal.id ? { ...g, adding: false } : g));
      }, 10);
    } else {
      alert('Можно добавить не более 5 целей');
    }
  };

  // Удаление цели
  const removeGoal = (goalId) => {
    setGoals(prev => prev.map(goal => goal.id === goalId ? { ...goal, removing: true } : goal));
    setTimeout(() => {
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    }, 300);
  };

  return (
    <div className={styles.container}>
      <h1>Цели</h1>
      <p className={styles.note}>Можно внести до 5 целей</p>

      {goals.map(goal => (
        <GoalForm
          key={goal.id}
          goal={goal}
          setGoals={setGoals}
          removeGoal={removeGoal}
        />
      ))}

      <button onClick={addGoal} className={styles.addGoalBtn}>
        + Добавить цель
      </button>
    </div>
  );
};

export default GoalsPage;
