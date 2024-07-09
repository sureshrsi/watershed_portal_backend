import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class District extends Model {}

District.init(
  {
    dist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    point_x: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    point_y: {
      type: DataTypes.NUMBER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "District",
    tableName: "dist",
  }
);

export default District;
