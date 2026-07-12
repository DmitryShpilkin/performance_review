/* src/hooks/useAnalytics.js */

import { useMemo } from "react";

// Конфигурация весов метрик. Легко менять из одного места.
const METRIC_WEIGHTS = {
  selfAssessmentField: 10,
  peerTaskFeedback: 10,
  peerInteraction: 10,
  managerNumericField: 10,
  potentialNumericField: 10,
};

/**
 * Безопасный парсер числа. Возвращает число только если строка чистая.
 */
const parseStrictNumber = (val) => {
  const num = Number(val);
  return Number.isFinite(num) ? num : 0;
};

export const useAnalytics = (formsData) => {
  // Деструктуризация с защитой
  const { 
    selfAssessment = {}, 
    peerFeedback = [], 
    managerReview = {}, 
    potentialAssessment = {} 
  } = formsData;

  return useMemo(() => {
    let totalScore = 0;
    let maxScore = 0;

    /* =========================
       1️⃣ Самооценка
       ========================= */
    if (typeof selfAssessment.satisfaction === 'number') {
      totalScore += selfAssessment.satisfaction * (METRIC_WEIGHTS.selfAssessmentField / 10);
      maxScore += METRIC_WEIGHTS.selfAssessmentField;
    }
    if (typeof selfAssessment.teamwork === 'number') {
      totalScore += selfAssessment.teamwork * (METRIC_WEIGHTS.selfAssessmentField / 10);
      maxScore += METRIC_WEIGHTS.selfAssessmentField;
    }

    /* =========================
       2️⃣ Обратная связь коллег
       Используем strict-парсер вместо просто Number()
       ========================= */
    peerFeedback.forEach(peer => {
      const taskFb = parseStrictNumber(peer.taskFeedback);
      const interaction = parseStrictNumber(peer.interaction);
      
      totalScore += taskFb + interaction;
      maxScore += METRIC_WEIGHTS.peerTaskFeedback + METRIC_WEIGHTS.peerInteraction;
    });

    /* =========================
       3️⃣ Оценка руководителя & Потенциал
       Собираем все числовые ключи динамически
       ========================= */
    for (const key in managerReview) {
      const value = managerReview[key];
      if (typeof value === "number") {
        totalScore += value * (METRIC_WEIGHTS.managerNumericField / 10);
        maxScore += METRIC_WEIGHTS.managerNumericField;
      }
    }

    for (const key in potentialAssessment) {
      const value = potentialAssessment[key];
      if (typeof value === "number") {
        totalScore += value * (METRIC_WEIGHTS.potentialNumericField / 10);
        maxScore += METRIC_WEIGHTS.potentialNumericField;
      }
    }

    /* =========================
       Расчет процента и рейтинга
       Добавлена проверка деления на ноль
       ========================= */
    let rating = 0;
    let percentage = 0;

    if (maxScore > 0) {
      percentage = Math.min(100, (totalScore / maxScore) * 100);
      
      if (percentage >= 85) rating = 3;
      else if (percentage >= 60) rating = 2;
      else if (percentage >= 30) rating = 1;
    }

    /* =========================
       Генерация рекомендаций
       Проверки сделаны безопаснее
       ========================= */
    const recommendations = [];
    
    if (typeof selfAssessment.takeaways === 'string' && 
        selfAssessment.takeaways.toLowerCase().includes("развивать")) {
      recommendations.push("Развивать профессиональные навыки");
    }
    if (peerFeedback.some(p => typeof p.improvement === 'string' && 
        p.improvement.toLowerCase().includes("сотрудничество"))) {
      recommendations.push("Улучшить взаимодействие с командой");
    }
    if (typeof managerReview.overallRating === 'number' && managerReview.overallRating < 5) {
      recommendations.push("Обратить внимание на соблюдение сроков");
    }

    return { 
      totalScore: Math.round(totalScore), 
      rating,
      percentage: Math.round(percentage),
      recommendations: recommendations.join("; ") 
    };
  }, [
    JSON.stringify(selfAssessment), 
    JSON.stringify(peerFeedback), 
    JSON.stringify(managerReview), 
    JSON.stringify(potentialAssessment)
  ]);
};