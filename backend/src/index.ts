/**
 * Главный файл запуска backend-сервера
 */

import "dotenv/config";
import express from "express";
import cors from "cors";

// =========================
// Импорт роутов
// =========================
import authRoutes from "../routes/authRoutes";
import pingRouter from "../routes/ping";
import goalsRoutes from "../routes/goalsRoutes";
import reviewsRoutes from "../routes/reviewsRoutes";

// Swagger — документация API
import { setupSwagger } from "./swagger";

// Создаём приложение Express
const app = express();

/**
 * CORS middleware
 * Разрешает запросы с frontend (React приложением на localhost:5173)
 */
app.use(
  cors({
    origin: "http://localhost:5173", // Адрес фронтенда
    credentials: true, // Разрешаем отправку cookie/jwt (если потребуется)
  })
);

/**
 * Позволяет backend принимать JSON в body запроса
 * Иначе req.body будет undefined
 */
app.use(express.json());

// =========================
// Подключение маршрутов API
// Все начинаются с /api
// =========================

// Проверка, что сервер жив
app.use("/api/ping", pingRouter);

// Авторизация и регистрация пользователей
app.use("/api/auth", authRoutes);

// Цели (Goals CRUD)
app.use("/api/goals", goalsRoutes);

// Отзывы и оценки (Review CRUD)
app.use("/api/reviews", reviewsRoutes);

// =========================
// Swagger - документация API
// доступна по: http://localhost:4000/api/docs
// =========================
setupSwagger(app);

// =========================
// Запуск сервера
// =========================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log("🗄 DATABASE_URL =", process.env.DATABASE_URL);
  console.log("📄 Swagger Docs: http://localhost:4000/api/docs");
});
