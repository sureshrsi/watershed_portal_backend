import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class Temperature30 extends Model {}

Temperature30.init(
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
    modelName: "Temperature30",
    tableName: "temperature_30m",
  }
);

export default Temperature30;
