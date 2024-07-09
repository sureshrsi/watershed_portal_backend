import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class Watershed extends Model {}

Watershed.init(
  {
    circle_id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    mini_whed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Watershed",
    tableName: "namsai_watershed_union",
  }
);

export default Watershed;
