import cors from "cors";
import express from "express";
import { sequelize } from "./db";
import clientsRouter from "./routes/client";
import usersRouter from "./routes/user";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json"

const app = express();
const PORT = 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL exitosa");

    // Sincroniza modelos con la base de datos
    await sequelize.sync({ alter: true }); // crea tablas si no existen
    console.log("Modelos sincronizados");

  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

start();

// Middleware para JSON
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.use("/clients", clientsRouter);
app.use("/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
