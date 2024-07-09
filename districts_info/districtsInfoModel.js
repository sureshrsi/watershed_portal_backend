import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class DistrictInfo extends Model {}

DistrictInfo.init(
  {
    district_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    head_quarters: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    geographical_area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_of_circles: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_of_blocks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_of_revenue_villages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    present_agriculture_area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "DistrictInfo",
    tableName: "districts_info",
  }
);

export default DistrictInfo;
