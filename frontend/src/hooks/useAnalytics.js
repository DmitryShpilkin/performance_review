import { useMemo } from "react";

/**
 * Хук подсчета результатов по формам
 * @param {Object} formsData - данные со всех форм: self, peer, manager, potential
 * @returns {Object} - totalScore, rating, recommendations
 */
export const useAnalytics = (formsData) => {
  const { selfAssessment = {}, peerFeedback = [], managerReview = {}, potentialAssessment = {} } = formsData;

  const result = useMemo(() => {
    let totalScore = 0;
    let maxScore = 0;

    // 1️⃣ Самооценка
    for (const key in selfAssessment) {
      if (typeof selfAssessment[key] === "number") {
        totalScore += selfAssessment[key];
        maxScore += 10; // допустим максимальная оценка по вопросу 10
      }
    }

    // 2️⃣ Обратная связь коллег
    peerFeedback.forEach(peer => {
      totalScore += Number(peer.taskFeedback) + Number(peer.interaction || 0);
      maxScore += 20; // допустим 2 вопроса по 10 баллов
    });

    // 3️⃣ Оценка руководителя
    for (const key in managerReview) {
      if (typeof managerReview[key] === "number") {
        totalScore += managerReview[key];
        maxScore += 10;
      }
    }

    // 4️⃣ Потенциал
    for (const key in potentialAssessment) {
      if (typeof potentialAssessment[key] === "number") {
        totalScore += potentialAssessment[key];
        maxScore += 10;
      }
    }

    // Определение рейтинга (пример)
    let rating = 0;
    const percentage = (totalScore / maxScore) * 100;
    if (percentage < 30) rating = 0;
    else if (percentage < 60) rating = 1;
    else if (percentage < 85) rating = 2;
    else rating = 3;

    // Генерация рекомендаций по триггерным словам
    let recommendations = [];
    if (selfAssessment.comment?.includes("развивать")) {
      recommendations.push("Развивать профессиональные навыки");
    }
    if (peerFeedback.some(p => p.improvement?.includes("сотрудничество"))) {
      recommendations.push("Улучшить взаимодействие с командой");
    }
    if (managerReview.comment?.includes("сроки")) {
      recommendations.push("Работать над соблюдением сроков");
    }

    return { totalScore, rating, recommendations: recommendations.join("; ") };
  }, [selfAssessment, peerFeedback, managerReview, potentialAssessment]);

  return result;
};
