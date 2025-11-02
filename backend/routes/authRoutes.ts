import { Router } from "express";
// Импортируем функции-контроллеры (логика регистрации и логина)
import { register, login } from "../controllers/authController";

// Создаём экземпляр роутера express
const router = Router();

/**
 * POST /register
 * Регистрация нового пользователя.
 * Здесь мы ожидаем в теле запроса: name, email, password, role (опционально)
 * Контроллер register обработает проверку, хеширование пароля и сохранение в DB.
 */
router.post("/register", register);

/**
 * POST /login
 * Авторизация пользователя.
 * В теле запроса ожидаем: email, password
 * Контроллер login проверяет, что пользователь существует, сверяет пароль,
 * и генерирует JWT токен при успешном входе.
 */
router.post("/login", login);

// Экспортируем router, чтобы подключить его в server.ts / app.ts
export default router;
