import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // для уникальных идентификаторов задач
import { notification } from 'antd'; // библиотека для уведомлений
import styles from "./GoalForm.module.css";

// =====================
// Функция для показа уведомления о приближающемся сроке
// =====================
const showDeadlineNotification = (goal) => {
  notification.warning({
    message: `Срок цели "${goal.name}" приближается!`,
    description: `Осталось мало времени до окончания срока: ${goal.deadline}`,
    placement: 'topRight',
    duration: 5,
  });
};

const GoalForm = ({ goal, setGoals, removeGoal }) => {

  // =====================
  // Изменение полей цели (name, results, deadline и т.д.)
  // =====================
  const handleGoalChange = (field, value) => {
    setGoals(prev =>
      prev.map(g => g.id === goal.id ? { ...g, [field]: value } : g)
    );
  };

  // =====================
  // Обработка даты дедлайна
  // Преобразуем строку "ДД.ММ.ГГГГ" в объект Date
  // =====================
  const handleDeadlineChange = (value) => {
    handleGoalChange('deadline', value);

    const parts = value.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      const dateObj = new Date(year, month - 1, day);
      handleGoalChange('deadlineDate', dateObj);
    }
  };

  // =====================
  // Эффект: уведомления о приближении сроков
  // Проверяем каждую минуту
  // =====================
  useEffect(() => {
    if (!goal.deadlineDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = goal.deadlineDate - now;
      const oneDay = 24 * 60 * 60 * 1000;

      // Если цель истекает через 1 день или меньше
      if (diff > 0 && diff < oneDay) {
        showDeadlineNotification(goal);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [goal.deadlineDate]);

  // =====================
  // Работа с задачами (Tasks)
  // =====================

  // Добавить новую задачу
  const addTask = () => {
    const newTask = { id: uuidv4(), text: '', adding: true };
    setGoals(prev =>
      prev.map(g => g.id === goal.id ? { ...g, tasks: [...g.tasks, newTask] } : g)
    );

    // Через 10мс убираем класс "adding" для анимации
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

  // Удалить задачу
  const removeTask = (taskId) => {
    // Сначала ставим флаг "removing" для анимации
    setGoals(prev =>
      prev.map(g =>
        g.id === goal.id
          ? { ...g, tasks: g.tasks.map(t => t.id === taskId ? { ...t, removing: true } : t) }
          : g
      )
    );

    // Через 300мс окончательно удаляем
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

  // Изменение текста задачи
  const handleTaskChange = (taskId, value) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goal.id
          ? { ...g, tasks: g.tasks.map(t => t.id === taskId ? { ...t, text: value } : t) }
          : g
      )
    );
  };

  // =====================
  // JSX разметка компонента
  // =====================
  return (
    <div className={`${styles.goalBlock} ${goal.adding ? styles.adding : ''} ${goal.removing ? styles.removing : ''}`}>

      {/* Заголовок цели с полем name и кнопкой удалить */}
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

      {/* Поле для дедлайна */}
      <label>
        Впишите сроки (ДД.ММ.ГГГГ):
        <input
          type="text"
          value={goal.deadline}
          onChange={(e) => handleDeadlineChange(e.target.value)}
          placeholder="Например: 31.12.2025"
        />
      </label>

      {/* Поле для ожидаемых результатов */}
      <label>
        Впишите ожидаемые результаты:
        <textarea
          value={goal.results}
          onChange={(e) => handleGoalChange('results', e.target.value)}
          placeholder="Опишите, чего ожидаете достичь"
        />
      </label>

      {/* Задачи */}
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

      {/* Кнопка добавления задачи */}
      <button onClick={addTask} className={styles.addTaskBtn}>
        + Добавить задачу
      </button>
    </div>
  );
};

export default GoalForm;
