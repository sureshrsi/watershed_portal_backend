import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class Temperature extends Model {}

Temperature.init(
  {
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    january: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    february: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    march: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    april: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    may: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    june: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    july: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    august: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    september: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    october: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    november: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    december: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    circle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    range_type: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Temperature",
    tableName: "temperature",
  }
);

export default Temperature;
