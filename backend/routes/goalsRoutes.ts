import { Router } from "express";
import { prisma } from "../src/prismaClient"; // Prisma Client для работы с DB

const router = Router();

/**
 * POST /goals/:userId
 * Сохранить цели пользователя (перезаписывает существующие)
 */
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // ID пользователя, для которого сохраняем цели
    const { goals } = req.body;    // массив целей из тела запроса

    /**
     * ❗️ ВАЖНО: такая логика "удалить всё → записать заново"
     * подходит, если на фронте цели всегда отправляются полностью.
     * Если в будущем цели нужно будет редактировать по одной — нужно будет
     * заменить на update / create / delete.
     */

    // Удаляем все старые цели пользователя
    await prisma.goal.deleteMany({ where: { userId } });

    // Создаем новые цели в базе
    await prisma.goal.createMany({
      data: goals.map((g: any) => ({
        id: g.id,          // если ID уже создан на фронтенде
        name: g.name,
        deadline: g.deadline,
        results: g.results,
        userId,            // устанавливаем владельца цели
      })),
    });

    res.json({ message: "Goals saved!" });
  } catch (error) {
    console.error("Ошибка при сохранении целей:", error);
    res.status(500).json({ error: "Failed to save goals" });
  }
});

/**
 * GET /goals/:userId
 * Получить все цели пользователя
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Получаем все цели пользователя из БД
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { name: "asc" }, // сортируем по имени (опционально)
    });

    res.json(goals);
  } catch (error) {
    console.error("Ошибка при получении целей:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

export default router;
