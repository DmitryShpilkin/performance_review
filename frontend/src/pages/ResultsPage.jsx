import React, { useState, useEffect } from 'react';
import styles from './ResultsPage.module.css';

// =========================
// Заглушка для рекомендаций
// Можно позже передавать реальные рекомендации из Analytics
// =========================
const recommendationsMap = {
  high: 'Отличный результат! Продолжайте развивать сильные стороны.',
  medium: 'Хороший результат. Рекомендуется проработать зоны для улучшения.',
  low: 'Низкий результат. Необходимо составить план развития и прокачки навыков.'
};

const ResultsPage = ({ responses }) => {
  // =========================
  // Состояния страницы
  // =========================
  const [totalScore, setTotalScore] = useState(0); // суммарный балл
  const [rating, setRating] = useState(''); // рейтинг по результатам
  const [recommendation, setRecommendation] = useState(''); // текст рекомендации
  const [managerComment, setManagerComment] = useState(''); // комментарий руководителя
  const [managerRating, setManagerRating] = useState(0); // рейтинг руководителя

  // =========================
  // Подсчет баллов на основе ответов
  // =========================
  const calculateScore = () => {
    let score = 0;

    // =========================
    // Тестовые данные, если responses пустой
    // =========================
    const demoResponses = responses?.length ? responses : [
      { q1: 5, q2: 4, q3: 3 },
      { q1: 4, q2: 3, q3: 5 }
    ];

    demoResponses.forEach(resp => {
      for (const key in resp) {
        if (typeof resp[key] === 'number') score += resp[key]; // суммируем числовые ответы
      }
    });

    setTotalScore(score);

    // Определяем рейтинг и рекомендации
    if (score >= 25) {
      setRating('Высокий');
      setRecommendation(recommendationsMap.high);
    } else if (score >= 15) {
      setRating('Средний');
      setRecommendation(recommendationsMap.medium);
    } else {
      setRating('Низкий');
      setRecommendation(recommendationsMap.low);
    }
  };

  // =========================
  // Вычисляем результаты при изменении responses
  // =========================
  useEffect(() => {
    calculateScore();
  }, [responses]);

  // =========================
  // Отправка комментария и рейтинга руководителя
  // =========================
  const handleSubmit = () => {
    alert(`Комментарий руководителя: ${managerComment}\nРейтинг: ${managerRating}`);
    // Здесь можно отправить данные на сервер
  };

  return (
    <div className={styles.container}>
      <h1>Подведение итогов</h1>

      {/* =========================
          Карточки с результатами
      ========================= */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <h2>Суммарный балл</h2>
          <p>{totalScore}</p>
        </div>

        <div className={styles.card}>
          <h2>Рейтинг</h2>
          <p>{rating}</p>
        </div>

        <div className={styles.card}>
          <h2>Рекомендации</h2>
          <p>{recommendation}</p>
        </div>
      </div>

      {/* =========================
          Раздел для комментария и оценки от руководителя
      ========================= */}
      <div className={styles.managerSection}>
        <h2>Комментарий руководителя</h2>
        <textarea
          value={managerComment}
          onChange={(e) => setManagerComment(e.target.value)}
          placeholder="Введите комментарий..."
        />

        <label>
          Рейтинг руководителя (0-10):
          <input
            type="number"
            min="0"
            max="10"
            value={managerRating}
            onChange={(e) => setManagerRating(Number(e.target.value))}
          />
        </label>

        <button onClick={handleSubmit}>Сохранить итог</button>
      </div>
    </div>
  );
};

export default ResultsPage;
