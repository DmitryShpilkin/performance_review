const API_URL = "http://localhost:4000/api";

export const api = {
  // Получить цели пользователя
  getGoals: async (userId) => {
    const res = await fetch(`${API_URL}/goals/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
  },

  // Сохранить цели пользователя
  saveGoals: async (userId, goals) => {
    const res = await fetch(`${API_URL}/goals/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals }),
    });
    if (!res.ok) throw new Error("Failed to save goals");
    return res.json();
  },

  // ✅ Создать отзыв
  createReview: async (userId, reviewData) => {
    const res = await fetch(`${API_URL}/reviews/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) throw new Error("Failed to create review");
    return res.json();
  },
};
