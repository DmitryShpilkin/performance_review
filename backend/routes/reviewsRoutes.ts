import { Router } from "express";
import { prisma } from "../src/prismaClient"; // Prisma Client для работы с БД

// Создаем роутер для работы с отзывами
const router = Router();

/**
 * ============================
 *  GET /api/reviews/:userId
 * ============================
 * Получает все отзывы пользователя (как получателя reviewee).
 * Используется для отображения блока "Обратная связь" на фронтенде.
 *
 * Пример запроса: GET /api/reviews/5271b011-f...e
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Получаем отзывы, которые этот пользователь получил
    const reviews = await prisma.review.findMany({
      where: { revieweeId: userId },
      include: {
        reviewer: true, // возвращаем данные о том, кто оставил отзыв
        goal: true,     // возвращаем данные цели, если есть привязка
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reviews);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

/**
 * ============================
 *  POST /api/reviews/:userId
 * ============================
 * Создает новый отзыв для пользователя (reviewee).
 * Фронтенд вызывает это при отправке формы "Самооценка / Peer Feedback / ...".
 *
 * Пример запроса:
 * POST /api/reviews/5271b011-f...e
 * body: {
 *   reviewerId: "4aa21..",
 *   goalId: "a123b...",
 *   type: "peer",
 *   content: "Отличная работа!",
 *   rating: 5
 * }
 */
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Кому пишем отзыв
    const { reviewerId, goalId, type, content, rating } = req.body;

    const review = await prisma.review.create({
      data: {
        reviewerId,          // Кто оставляет отзыв
        revieweeId: userId,  // Кому оставлен отзыв
        goalId: goalId || null,
        type,
        content,
        rating: rating ?? null,
      },
    });

    res.json(review);
  } catch (error) {
    console.error("Ошибка при создании отзыва:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
});

export default router;
