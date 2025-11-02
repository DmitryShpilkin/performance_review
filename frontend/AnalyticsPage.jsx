import React, { useState, useEffect } from 'react';
import styles from './AnalyticsPage.module.css';

// =============================
// Пример триггерных рекомендаций
// =============================
const recommendationsMap = {
  high: 'Отличный результат! Продолжайте развивать сильные стороны.',
  medium: 'Хороший результат. Рекомендуется проработать зоны для улучшения.',
  low: 'Низкий результат. Необходимо составить план развития и прокачки навыков.'
};

// =============================
// Тестовые ответы для демонстрации
// =============================
const testResponses = [
  { q1: 5, q2: 4, q3: 5 }, // тестовые данные
  { q1: 3, q2: 4, q3: 3 },
  { q1: 4, q2: 5, q3: 4 }
];

// =============================
// Главный компонент страницы аналитики
// =============================
const AnalyticsPage = ({ responses /* = реальные данные, закомментированы для теста */ }) => {
  // Для примера используем тестовые данные
  const data = responses || testResponses;

  // =============================
  // Состояния для подсчёта результатов
  // =============================
  const [totalScore, setTotalScore] = useState(0); // сумма баллов
  const [rating, setRating] = useState('');        // рейтинг: высокий/средний/низкий
  const [recommendation, setRecommendation] = useState(''); // текст рекомендации

  // =============================
  // Функция подсчёта баллов и определение рейтинга
  // =============================
  const calculateScore = () => {
    let score = 0;

    // Подсчёт суммы всех числовых ответов
    data.forEach(resp => {
      for (const key in resp) {
        if (typeof resp[key] === 'number') {
          score += resp[key];
        }
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

  // =============================
  // useEffect для пересчёта при изменении данных
  // =============================
  useEffect(() => {
    calculateScore();
  }, [data]);

  // =============================
  // JSX
  // =============================
  return (
    <div className={styles.container}>
      {/* Заголовок страницы */}
      <h1>Итоги оценки</h1>

      {/* Карточки с результатами */}
      <div className={styles.cardContainer}>
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

      {/* Детальные рекомендации */}
      <div className={styles.recommendations}>
        <h2>Детальные рекомендации</h2>
        <p>На основе ваших ответов и триггерных слов сформированы рекомендации по развитию:</p>
        <ul>
          <li>Развивайте ключевые профессиональные компетенции.</li>
          <li>Работайте над зонами улучшения, отмеченными в обзорах коллег.</li>
          <li>Используйте обратную связь для корректировки своих целей и действий.</li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;
