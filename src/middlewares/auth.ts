import { Request, Response, NextFunction } from "express";
import { Client } from "../models/client";

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "El Bearer token es necesario" });

  const token = authHeader.replace("Bearer ", "");
  const client = await Client.findOne({ where: { apiKey: token } });
  if (!client) return res.status(403).json({ message: "API_KEY inválida" });

  req.client = client;
  next();
};

// Extensión del Request para TypeScript
declare global {
  namespace Express {
    interface Request {
      client?: import("../models/client").Client;
    }
  }
}
