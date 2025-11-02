import React, { useState } from 'react';
import styles from './ReviewForms.module.css';

const PotentialAssessmentForm = () => {
  // =========================
  // Состояние формы оценки потенциала
  // professional - массив профессиональных качеств
  // personal - массив личных качеств
  // motivated - уровень мотивации развиваться
  // successor - считается ли сотрудник преемником
  // riskOfLeaving - степень риска ухода (0-10)
  // =========================
  const [assessment, setAssessment] = useState({
    professional: [],
    personal: [],
    motivated: null,
    successor: null,
    riskOfLeaving: 0
  });

  // =========================
  // Универсальная функция для изменения любого поля в assessment
  // =========================
  const handleChange = (field, value) => {
    setAssessment(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.formBlock}>
      <h2>Оценка потенциала</h2>

      {/* =========================
          Профессиональные качества (мультивыбор)
          ========================= */}
      <label>
        1. Профессиональные качества:
        <select
          multiple
          value={assessment.professional}
          onChange={(e) =>
            handleChange(
              'professional',
              Array.from(e.target.selectedOptions, option => option.value)
            )
          }
        >
          <option value="responsibility">Ответственность</option>
          <option value="resultOriented">Ориентация на результат</option>
          <option value="proactive">Проактивность</option>
          <option value="openMind">Открытое мышление</option>
          <option value="teamPlayer">Командный игрок</option>
        </select>
      </label>

      {/* =========================
          Личные качества (мультивыбор)
          ========================= */}
      <label>
        2. Личные качества:
        <select
          multiple
          value={assessment.personal}
          onChange={(e) =>
            handleChange(
              'personal',
              Array.from(e.target.selectedOptions, option => option.value)
            )
          }
        >
          <option value="responsibility">Брал на себя ответственность</option>
          <option value="transparentCommunication">Прозрачная коммуникация</option>
          <option value="infoSharing">Делился информацией</option>
          <option value="organized">Выстраивал работу по задаче</option>
        </select>
      </label>

      {/* =========================
          Мотивация развиваться (выбор одного значения)
          ========================= */}
      <label>
        3. Мотивация развиваться:
        <select
          value={assessment.motivated}
          onChange={(e) => handleChange('motivated', e.target.value)}
        >
          <option value="">Выбрать</option>
          <option value="high">Да, проактивно</option>
          <option value="medium">Да, нужна помощь</option>
          <option value="low">Не уверен</option>
          <option value="none">Не хочет</option>
        </select>
      </label>

      {/* =========================
          Считается ли сотрудник преемником (выбор одного значения)
          ========================= */}
      <label>
        4. Считаешь ли сотрудника своим преемником:
        <select
          value={assessment.successor}
          onChange={(e) => handleChange('successor', e.target.value)}
        >
          <option value="">Выбрать</option>
          <option value="yes">Да</option>
          <option value="no">Нет</option>
        </select>
      </label>

      {/* =========================
          Риск ухода (числовое поле 0-10)
          ========================= */}
      <label>
        5. Степень риска ухода (0-10):
        <input
          type="number"
          min="0"
          max="10"
          value={assessment.riskOfLeaving}
          onChange={(e) => handleChange('riskOfLeaving', e.target.value)}
        />
      </label>
    </div>
  );
};

export default PotentialAssessmentForm;
