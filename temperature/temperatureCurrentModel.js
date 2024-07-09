import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class TemperatureCurrent extends Model {}

TemperatureCurrent.init(
  {
    temperature: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    weatherCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    precipitationType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Temperature",
    tableName: "temperature_current",
  }
);

export default TemperatureCurrent;
