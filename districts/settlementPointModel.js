import { getConnection } from "../db/index.js";
import pkg from "sequelize";

const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class SettlementPoint extends Model {}

SettlementPoint.init(
  {
    cir_id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SettlementPoint",
    tableName: "namsai_settlement_point_update",
  }
);

export default SettlementPoint;
