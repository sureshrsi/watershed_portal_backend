import { getConnection } from "../db/index.js";
import pkg from "sequelize";
const { DataTypes, Model } = pkg;
const sequelize = await getConnection();
class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);
export default User;
