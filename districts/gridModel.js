import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class Grid extends Model {}

Grid.init(
  {
    circle_id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    grid_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Grid",
    tableName: "namsai_grid_union",
  }
);

export default Grid;
