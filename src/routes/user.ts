import { Router } from "express";
import { apiKeyAuth } from "../middlewares/auth";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = Router();

// Todas las rutas requieren API_KEY
router.use(apiKeyAuth);

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { email, password, extraInfo } = req.body;
    const clientId = req.client!.id;

    if (!email || !password)
      return res.status(400).json({ message: "El correo y la contraseña son requeridos" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      extraInfo: extraInfo || {},
      clientId,
    });

    res.status(201).json({ id: user.id, email: user.email, extraInfo: user.extraInfo });
  } catch (error) {
    res.status(500).json({ message: "Error creando al usuario: ", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientId = req.client!.id;

    if (!email || !password)
      return res.status(400).json({ message: "El correo y la contraseña son requeridos" });

    const user = await User.findOne({ where: { email, clientId } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Contraseña inválida" });

    const JWT_SECRET = process.env.JWT_SECRET || "";

    const token = jwt.sign(
      { userId: user.id, clientId: clientId },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id, email: user.email, extraInfo: user.extraInfo } });
  } catch (error) {
    res.status(500).json({ message: "Error iniciando sesión: ", error });
  }
});

export default router;
