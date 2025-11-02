import { PrismaClient } from "@prisma/client";

// Создаём единственный экземпляр клиента Prisma
export const prisma = new PrismaClient();
