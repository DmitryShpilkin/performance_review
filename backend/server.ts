// ============================
// Главный файл сервера backend
// ============================

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Загружаем переменные окружения из .env
dotenv.config();

// Импорт маршрутов
import authRoutes from "./routes/authRoutes";
import goalsRoutes from "./routes/goalsRoutes";
import reviewsRoutes from "./routes/reviewsRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// ============================
// Middleware
// ============================

// Позволяет фронтенду обращаться к backend
app.use(cors());

// Позволяет Express принимать JSON в запросах
app.use(express.json());

// ============================
// Подключение маршрутов
// ============================

// Авторизация / логин / регистрация
app.use("/api/auth", authRoutes);

// Работа с целями пользователя
app.use("/api/goals", goalsRoutes);

// Работа с отзывами
app.use("/api/reviews", reviewsRoutes);

// Тестовый маршрут
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend is running ✅" });
});

// ============================
// Глобальный обработчик ошибок
// ============================
// (если где-то в контроллерах будет throw Error(), оно попадёт сюда)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ============================
// Запуск сервера
// ============================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
