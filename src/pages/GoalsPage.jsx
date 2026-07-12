/* src/pages/GoalsPage.jsx */

import React, { useState, useEffect } from "react";
import GoalForm from "../components/GoalForm";
import styles from "./GoalsPage.module.css";
import { api } from "../api/api.js";
// Импорт вынесен отдельно для наглядности, убедитесь, что пакет установлен
import { v4 as uuidv4 } from "uuid"; 
import { notification } from 'antd';

const GoalsPage = () => {
  const userId = "demo-user-id";

  const [goals, setGoals] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка целей с backend
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await api.getGoals(userId);
        
        // Нормализация данных от сервера
        const normalizedGoals = Array.isArray(data)
          ? data.map(g => ({
                ...g,
                tasks: Array.isArray(g?.tasks) 
                  ? g.tasks.map(t => ({ ...t, removing: false, adding: false }))
                  : [{ id: uuidv4(), text: "" }],
                deadline: g.deadline || "",
                results: g.results || "",
                name: g.name || `Цель ${g.id}`,
            }))
          : [];

        setGoals(normalizedGoals);
      } catch (error) {
        console.error("Ошибка загрузки целей:", error);
        // Фолбэк-шаблон, чтобы страница не была пустой
        setGoals([
          {
            id: uuidv4(),
            name: "Цель 1",
            deadline: "",
            results: "",
            tasks: [{ id: uuidv4(), text: ""}],
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGoals();
  }, []);

  // Добавление новой цели
  const addGoal = () => {
    if (goals.length >= 5) {
      notification.warning({
        message: 'Лимит достигнут',
        description: 'Можно добавить не более 5 целей.',
        duration: 2,
      });
      return;
    }

    const newGoal = {
      id: uuidv4(),
      name: `Цель ${goals.length + 1}`,
      deadline: "",
      results: "",
      tasks: [{ id: uuidv4(), text: "" }], // Флаги удалены, задача просто добавляется
      adding: true,
    };

    setGoals(prev => [...prev, newGoal]);

    // Снимаем флаг добавления для триггера анимации входа
    setTimeout(() => {
      setGoals(prev => prev.map(g => g.id === newGoal.id ? { ...g, adding: false } : g));
    }, 50);
  };

  // Удаление цели
  const removeGoal = (goalId) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, removing: true } : g));
    setTimeout(() => {
      setGoals(prev => prev.filter(g => g.id !== goalId));
    }, 300);
  };

  // Сохранение целей
  const saveGoals = async () => {
    try {
      await api.saveGoals(userId, goals);
      notification.success({
        message: 'Успешно!',
        description: 'Цели успешно сохранены!',
        duration: 2,
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Ошибка',
        description: 'Не удалось сохранить цели.',
        duration: 2,
      });
    }
  };

  // ОТРИСОВКА
  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1>Загрузка...</h1>
      </div>
    );
  }

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

      <div className={styles.buttons}>
        <button onClick={addGoal} className={styles.addGoalBtn}>
          + Добавить цель
        </button>
        <button onClick={saveGoals} className={styles.saveGoalBtn}>
          💾 Сохранить цели
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;