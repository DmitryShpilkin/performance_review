import React, { useState, useMemo } from 'react';
import { Select } from 'antd';
import GoalForm from '../components/GoalForm';
import SelfAssessmentForm from '../components/SelfAssessmentForm';
import PeerFeedbackForm from '../components/PeerFeedbackForm';
import ManagerReviewForm from '../components/ManagerReviewForm';
import PotentialAssessmentForm from '../components/PotentialAssessmentForm';
import { useAuth } from '../context/AuthContext';
import styles from './ReviewPage.module.css';

const { Option } = Select;

const parseDate = (str) => {
  const [day, month, year] = str.split('.').map(Number);
  return new Date(year, month - 1, day);
};

const daysLeft = (deadlineStr) => {
  const deadline = parseDate(deadlineStr);
  const now = new Date();
  const diff = deadline - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const ReviewPage = () => {
  const { user } = useAuth();
  const role = user?.role || 'employee';

  const [expandedSections, setExpandedSections] = useState({
    self: false,
    peer: false,
    manager: false,
    potential: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // =========================
  // Сотрудники и их цели
  // =========================
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employees = useMemo(() => [
    { id: 'employee1', name: 'Сотрудник 1', goals: [
      { id: 1, name: 'Цель 1', deadline: '31.12.2025', results: 'Результат 1', tasks: [] },
      { id: 2, name: 'Цель 2', deadline: '15.11.2025', results: 'Результат 2', tasks: [] },
    ]},
    { id: 'employee2', name: 'Сотрудник 2', goals: [
      { id: 3, name: 'Цель A', deadline: '20.11.2025', results: 'Результат A', tasks: [] },
    ]},
  ], []);

  const employeeGoals = useMemo(() => {
    const emp = employees.find(e => e.id === selectedEmployee);
    return emp ? emp.goals : [];
  }, [selectedEmployee, employees]);

  // =========================
  // Видимость секций
  // =========================
  const visibleSections = {
    self: role === 'employee' || role === 'manager' || role === 'hr' || role === 'admin',
    peer: role === 'employee' || role === 'manager' || role === 'hr' || role === 'admin',
    manager: role === 'manager' || role === 'hr' || role === 'admin',
    potential: role === 'manager' || role === 'hr' || role === 'admin',
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Обзор обратной связи и оценок</h1>

      {/* Выбор сотрудника */}
      {(role === 'manager' || role === 'hr' || role === 'admin') && (
        <div className={styles.section}>
          <label>Выберите сотрудника для оценки:</label>
          <Select
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            style={{ width: 300 }}
            placeholder="Выберите сотрудника"
          >
            {employees.map(emp => (
              <Option key={emp.id} value={emp.id}>{emp.name}</Option>
            ))}
          </Select>

          {/* Цели выбранного сотрудника */}
          {selectedEmployee && (
            <div className={styles.employeeGoals}>
              <h3>Цели сотрудника:</h3>
              {employeeGoals.map(goal => (
                <div key={goal.id} className={styles.goalWithDeadline}>
                  <GoalForm
                    goal={goal}
                    setGoals={() => {}}
                    removeGoal={() => {}}
                  />
                  <div className={styles.daysLeft}>
                    {daysLeft(goal.deadline) >= 0
                      ? `Осталось дней: ${daysLeft(goal.deadline)}`
                      : 'Срок истёк'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {visibleSections.self && (
        <div className={styles.section}>
          <button className={styles.toggleBtn} onClick={() => toggleSection('self')}>
            Самооценка {expandedSections.self ? '▲' : '▼'}
          </button>
          <div className={`${styles.sectionContent} ${expandedSections.self ? styles.open : ''}`}>
            {expandedSections.self && <SelfAssessmentForm />}
          </div>
        </div>
      )}

      {visibleSections.peer && (
        <div className={styles.section}>
          <button className={styles.toggleBtn} onClick={() => toggleSection('peer')}>
            Обратная связь коллег {expandedSections.peer ? '▲' : '▼'}
          </button>
          <div className={`${styles.sectionContent} ${expandedSections.peer ? styles.open : ''}`}>
            {expandedSections.peer && <PeerFeedbackForm />}
          </div>
        </div>
      )}

      {visibleSections.manager && (
        <div className={styles.section}>
          <button className={styles.toggleBtn} onClick={() => toggleSection('manager')}>
            Оценка руководителя {expandedSections.manager ? '▲' : '▼'}
          </button>
          <div className={`${styles.sectionContent} ${expandedSections.manager ? styles.open : ''}`}>
            {expandedSections.manager && <ManagerReviewForm />}
          </div>
        </div>
      )}

      {visibleSections.potential && (
        <div className={styles.section}>
          <button className={styles.toggleBtn} onClick={() => toggleSection('potential')}>
            Потенциал сотрудника {expandedSections.potential ? '▲' : '▼'}
          </button>
          <div className={`${styles.sectionContent} ${expandedSections.potential ? styles.open : ''}`}>
            {expandedSections.potential && <PotentialAssessmentForm />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
