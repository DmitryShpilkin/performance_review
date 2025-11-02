// ✅ Импортируем PrismaClient (подключение к базе данных)
import { PrismaClient } from "@prisma/client";

// ✅ Импортируем bcrypt для хеширования паролей
import bcrypt from "bcryptjs";

// ✅ Импортируем JWT для токенов
import jwt from "jsonwebtoken";

// Создаём один экземпляр PrismaClient
const prisma = new PrismaClient();

export default {
  /**
   * Регистрация нового пользователя
   * @param name — имя пользователя
   * @param email — e-mail (уникальный)
   * @param password — пароль
   * @param role — роль (employee, manager, admin и т.д.)
   */
  register: async ({ name, email, password, role }: any) => {
    // Проверяем, существует ли уже пользователь с таким email
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("User already exists");

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавляем пользователя в базу
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "employee", // роль по умолчанию
      },
    });

    return user;
  },

  /**
   * Авторизация (логин)
   * @param email — e-mail пользователя
   * @param password — пароль
   * @returns JWT token
   */
  login: async ({ email, password }: any) => {
    // Ищем пользователя в базе
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    // Проверяем пароль
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Wrong password");

    // Создаём JWT токен
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!, // ключ берём из .env
      {
        expiresIn: "7d", // срок токена
      }
    );

    return token;
  },
};
