// Импорт типов Request и Response из Express для корректной типизации
import { Request, Response } from "express";
// Импорт сервиса работы с пользователями
import userService from "../services/userService";

/**
 * Регистрация нового пользователя
 * POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    // Вызываем сервис для регистрации, передавая данные из тела запроса
    const user = await userService.register(req.body);
    // Возвращаем созданного пользователя
    res.json(user);
  } catch (error: any) {
    // Если ошибка, возвращаем статус 400 и сообщение
    res.status(400).json({ error: error.message });
  }
};

/**
 * Логин пользователя
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    // Вызываем сервис для логина, получаем JWT токен
    const token = await userService.login(req.body);
    // Отправляем токен клиенту
    res.json({ token });
  } catch (error: any) {
    // Если ошибка авторизации, возвращаем статус 401 и сообщение
    res.status(401).json({ error: error.message });
  }
};
