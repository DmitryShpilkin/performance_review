import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",  // версия спецификации OpenAPI
      info: {
        title: "Performance Review API",
        version: "1.0.0",
        description: "API документация для системы Performance Review",
      },
      servers: [
        {
          url: "http://localhost:4000/api", // базовый URL для локального сервера
          description: "Локальный сервер",
        },
      ],
    },
    apis: ["../routes/*.ts"], // путь к файлам с JSDoc-аннотациями для генерации схем
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // подключаем Swagger UI к маршруту /api/docs
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
