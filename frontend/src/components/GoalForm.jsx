import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from "./GoalForm.module.css";


const GoalForm = ({ goal, setGoals, removeGoal }) => {
  // Изменение полей цели
  const handleGoalChange = (field, value) => {
    setGoals(prev =>
      prev.map(g => g.id === goal.id ? { ...g, [field]: value } : g)
    );
  };

  // Задачи
  const addTask = () => {
    const newTask = { id: uuidv4(), text: '', adding: true };
    setGoals(prev =>
      prev.map(g => g.id === goal.id ? { ...g, tasks: [...g.tasks, newTask] } : g)
    );
    setTimeout(() => {
      setGoals(prev =>
        prev.map(g =>
          g.id === goal.id
            ? { ...g, tasks: g.tasks.map(t => t.id === newTask.id ? { ...t, adding: false } : t) }
            : g
        )
      );
    }, 10);
  };

  const removeTask = (taskId) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goal.id
          ? { ...g, tasks: g.tasks.map(t => t.id === taskId ? { ...t, removing: true } : t) }
          : g
      )
    );
    setTimeout(() => {
      setGoals(prev =>
        prev.map(g =>
          g.id === goal.id
            ? { ...g, tasks: g.tasks.filter(t => t.id !== taskId) }
            : g
        )
      );
    }, 300);
  };

  const handleTaskChange = (taskId, value) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goal.id
          ? { ...g, tasks: g.tasks.map(t => t.id === taskId ? { ...t, text: value } : t) }
          : g
      )
    );
  };

  return (
    <div className={`${styles.goalBlock} ${goal.adding ? styles.adding : ''} ${goal.removing ? styles.removing : ''}`}>
      <div className={styles.goalHeader}>
        <input
          type="text"
          value={goal.name}
          onChange={(e) => handleGoalChange('name', e.target.value)}
          placeholder="Введите название цели"
          className={styles.goalNameInput}
        />
        <button className={styles.removeBtn} onClick={() => removeGoal(goal.id)}>
          Удалить цель
        </button>
      </div>

      <label>
        Впишите сроки:
        <textarea
          value={goal.deadline}
          onChange={(e) => handleGoalChange('deadline', e.target.value)}
          placeholder="Например: до конца квартала"
        />
      </label>

      <label>
        Впишите ожидаемые результаты:
        <textarea
          value={goal.results}
          onChange={(e) => handleGoalChange('results', e.target.value)}
          placeholder="Опишите, чего ожидаете достичь"
        />
      </label>

      <label>Впишите ключевые задачи к цели:</label>

      {goal.tasks.map((task, index) => (
        <div
          key={task.id}
          className={`${styles.taskRow} ${task.adding ? styles.adding : ''} ${task.removing ? styles.removing : ''}`}
        >
          <span>Задача {index + 1}</span>
          <textarea
            value={task.text}
            onChange={(e) => handleTaskChange(task.id, e.target.value)}
            placeholder="Опишите задачу"
          />
          <button className={styles.removeBtn} onClick={() => removeTask(task.id)}>
            Удалить
          </button>
        </div>
      ))}

      <button onClick={addTask} className={styles.addTaskBtn}>
        + Добавить задачу
      </button>
    </div>
  );
};

export default GoalForm;
