import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Client extends Model {
  public id!: number;
  public name!: string;
  public apiKey!: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "clients", // nombre de la tabla en PostgreSQL
    timestamps: true,     // crea columnas createdAt y updatedAt
  }
);
