// src/api/api.js

const BASE_URL = '/api'; // Базовый URL вашего бэкенда

/**
 * Универсальная функция обработки ответа
 */
async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    // Если сервер вернул ошибку (например, 404 или 500)
    throw new Error(data.message || 'Что-то пошло не так');
  }
  return data;
}

/**
 * Объект с методами API
 */
export const api = {
  /**
   * Загрузка целей конкретного пользователя
   */
  getGoals: async (userId) => {
    const response = await fetch(`${BASE_URL}/goals/${userId}`);
    return handleResponse(response);
  },

  /**
   * Сохранение массива целей
   */
  saveGoals: async (userId, goalsData) => {
    const response = await fetch(`${BASE_URL}/goals/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalsData),
    });
    return handleResponse(response);
  },

  /**
   * Получение списка сотрудников (для ReviewPage)
   */
  getEmployees: async () => {
    const response = await fetch(`${BASE_URL}/employees`);
    return handleResponse(response);
  },

  /**
   * Сохранение финальных результатов встречи (из ResultsPage)
   */
  saveFinalResults: async (data) => {
    const response = await fetch(`${BASE_URL}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};