import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public extraInfo!: object;
  public clientId!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extraInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);
