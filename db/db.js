import { Sequelize } from "sequelize";
import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });

const dbString = `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@192.168.1.19:5432/${process.env.POSTGRES_DB}`;

const getConnection = async () => {
  const sequelize = new Sequelize(dbString, {
    logging: console.log,
    // dialectOptions: {
    //   multipleStatements: true,
    // },
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  return sequelize;
};

export { dbString };

export default getConnection;
