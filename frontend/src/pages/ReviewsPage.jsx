import React, { useState, useMemo, useEffect } from 'react';
import { Select } from 'antd'; // Компонент выпадающего списка из библиотеки Ant Design
import GoalForm from '../components/GoalForm'; // Форма для работы с целями сотрудника
import SelfAssessmentForm from '../components/SelfAssessmentForm'; // Форма самооценки сотрудника
import PeerFeedbackForm from '../components/PeerFeedbackForm'; // Форма обратной связи от коллег
import ManagerReviewForm from '../components/ManagerReviewForm'; // Форма оценки руководителя
import PotentialAssessmentForm from '../components/PotentialAssessmentForm'; // Форма оценки потенциала сотрудника
import { useAuth } from '../context/AuthContext'; // Хук для получения данных аутентифицированного пользователя
import { api } from "../api/api"; // Импорт API-клиента для взаимодействия с бэкендом
import styles from './ReviewPage.module.css'; // CSS-модули для стилизации страницы

const { Option } = Select; // Деструктуризация компонента Option из Select для удобства использования

// =========================
// Вспомогательные функции для работы с датами
// =========================

/**
 * Преобразует строку формата "дд.мм.гггг" в объект Date
 * @param {string} str - строка с датой в формате "дд.мм.гггг"
 * @returns {Date} - объект Date, соответствующий переданной дате
 */
const parseDate = (str) => {
  const [day, month, year] = str.split('.').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Рассчитывает количество оставшихся дней до указанной даты
 * @param {string} deadlineStr - строка с датой в формате "дд.мм.гггг" (дедлайн)
 * @returns {number} - количество оставшихся полных дней (округлено вверх)
 */
const daysLeft = (deadlineStr) => {
  const deadline = parseDate(deadlineStr);
  const now = new Date();
  const diff = deadline - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const ReviewPage = () => {
  const { user } = useAuth(); // Получаем данные аутентифицированного пользователя
  const role = user?.role || 'employee'; // Определяем роль пользователя (по умолчанию — employee)

  // Состояние для управления раскрытием секций формы
  const [expandedSections, setExpandedSections] = useState({
    self: false,   // Самооценка
    peer: false,    // Обратная связь коллег
    manager: false, // Оценка руководителя
    potential: false // Оценка потенциала
  });

  /**
   * Переключает состояние раскрытия указанной секции
   * @param {string} section - идентификатор секции (self/peer/manager/potential)
   */
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // =========================
  // Тестовые сотрудники и их цели
  // =========================

  const [selectedEmployee, setSelectedEmployee] = useState(null); // Выбранный для оценки сотрудник
  const [employees, setEmployees] = useState([
    { id: 'employee1', name: 'Сотрудник 1', goals: [] },
    { id: 'employee2', name: 'Сотрудник 2', goals: [] },
  ]);

  // =========================
  // Подключение к backend для получения целей
  // =========================

  useEffect(() => {
    const loadGoals = async () => {
      try {
        // Загружаем цели для каждого сотрудника
        const updatedEmployees = await Promise.all(
          employees.map(async (emp) => {
            const goals = await api.getGoals(emp.id); // Получаем цели с бэкенда
            return { ...emp, goals: goals || [] };
          })
        );
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Ошибка при загрузке целей:", error);
      }
    };

    loadGoals();
  }, []); // Пустой массив зависимостей — вызов один раз при монтировании компонента

  // Получаем цели выбранного сотрудника (кешированный результат)
  const employeeGoals = useMemo(() => {
    const emp = employees.find(e => e.id === selectedEmployee);
    return emp ? emp.goals : [];
  }, [selectedEmployee, employees]);

  // =========================
  // Видимость секций по роли
  // =========================

  // Определяем, какие секции доступны для текущей роли пользователя
  const visibleSections = {
    self: role === 'employee' || role === 'manager' || role === 'hr' || role === 'admin',
    peer: role === 'employee' || role === 'manager' || role === 'hr' || role === 'admin',
    manager: role === 'manager' || role === 'hr' || role === 'admin',
    potential: role === 'manager' || role === 'hr' || role === 'admin',
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Обзор обратной связи и оценок</h1>

      {/* Выбор сотрудника (доступен для manager, hr, admin) */}
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

          {/* Отображение целей выбранного сотрудника */}
          {selectedEmployee && (
            <div className={styles.employeeGoals}>
              <h3>Цели сотрудника:</h3>
              {employeeGoals.map(goal => (
                <div key={goal.id} className={styles.goalWithDeadline}>
                  <GoalForm
                    goal={goal}
                    setGoals={() => { }} // TODO: добавить возможность редактирования
                    removeGoal={() => { }}
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

      {/* Секция самооценки */}
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

      {/* Секция обратной связи коллег */}
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

      {/* Секция оценки руководителя */}
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

      {/* Секция оценки потенциала */}
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
