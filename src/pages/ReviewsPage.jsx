
/* src/pages/ReviewsPage.jsx */

import React, { useState, useMemo, useEffect } from 'react';
import { Select } from 'antd';
import GoalForm from '../components/GoalForm';
import { useAuth } from '../context/AuthContext';
import { api } from "../api/api";
import styles from './ReviewPage.module.css'; 
// import { v4 as uuidv4 } from 'uuid'; // Удалено, больше не используется здесь

const { Option } = Select;

const ReviewsPage = () => {
  const { user } = useAuth();
  const role = user?.role || 'employee';

  // Данные сотрудников
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    { id: 'u1', name: 'Сотрудник 1', goals: [] },
    { id: 'u2', name: 'Сотрудник 2', goals: [] },
  ]);

  // Загрузка целей всех сотрудников параллельно при открытии страницы
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const updatedEmployees = await Promise.all(
          employees.map(async (emp) => {
            const goals = await api.getGoals(emp.id);
            
            // Нормализуем задачи внутри целей на случай пустого ответа сервера
            const safeGoals = Array.isArray(goals) 
              ? goals.map(g => ({
                  ...g,
                  tasks: Array.isArray(g.tasks) ? g.tasks : []
                }))
              : [];
              
            return { ...emp, goals: safeGoals };
          })
        );
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Ошибка загрузки целей:", error);
      }
    };
    
    loadGoals();
  }, []);

  // Мемоизация данных выбранного сотрудника
  const employeeGoals = useMemo(() => {
    const emp = employees.find(e => e.id === selectedEmployee);
    return emp ? emp.goals : [];
  }, [selectedEmployee, employees]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Обзор обратной связи и оценок</h1>

      {/* Блок доступен только для руководителей */}
      {(role === 'manager' || role === 'hr' || role === 'admin') && (
        <div className={styles.section}>
          <label>Выберите сотрудника для оценки:</label>
          <Select
            showSearch
            optionFilterProp="children"
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            style={{ width: '100%', maxWidth: 400 }}
            placeholder="Начните вводить имя..."
          >
            {employees.map((emp, index) => (
              <Option key={`emp-${index}-${emp.id}`} value={emp.id}>{emp.name}</Option>
            ))}
          </Select>

          {/* Отображение целей выбранного сотрудника */}
          {selectedEmployee && (
            <div className={styles.employeeGoals}>
              <h3>Цели сотрудника:</h3>
              {employeeGoals.length > 0 ? (
                employeeGoals.map(goal => (
                  <div key={goal.id} className={styles.goalWithDeadline}>
                    {/* Передаем заглушки, так как редактирование здесь не предполагается */}
                    <GoalForm
                      goal={goal}
                      setGoals={() => {}}
                      removeGoal={() => {}}
                    />
                  </div>
                ))
              ) : (
                <p style={{ color: '#ccc' }}>У этого сотрудника пока нет поставленных целей.</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Если сотрудник не выбран или у него нет прав менеджера */}
      {!selectedEmployee && (role === 'manager' || role === 'hr' || role === 'admin') && (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#aaa' }}>
          Выберите сотрудника из списка выше, чтобы просмотреть его цели.
        </p>
      )}

      {/* Сообщение для обычных сотрудников (не менеджеров) */}
      {(role !== 'manager' && role !== 'hr' && role !== 'admin') && (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#aaa' }}>
          У вас недостаточно прав для просмотра этой страницы.
        </p>
      )}
    </div>
  );
};

export default ReviewsPage;