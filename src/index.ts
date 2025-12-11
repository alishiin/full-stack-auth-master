import dotenv from "dotenv";
dotenv.config();console.log("DATABASE_URL:", process.env.DATABASE_URL);


import cors from "cors";
import express from "express";
import { sequelize } from "./db";
import clientsRouter from "./routes/client";
import usersRouter from "./routes/user";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a Supabase exitosa");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados");

  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

start();

app.use(express.json());
app.use(cors());

app.use("/clients", clientsRouter);
app.use("/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
