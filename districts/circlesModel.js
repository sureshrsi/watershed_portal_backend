import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class Circle extends Model {}

Circle.init(
  {
    cir_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    circle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dist_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Circle",
    tableName: "namsaicircle",
  }
);

export default Circle;
