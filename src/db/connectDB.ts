import * as pg from "pg";
import { Sequelize } from "sequelize";
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT as string),
    dialect: "postgres",
    dialectModule: pg,
    define: {
      timestamps: false,
    },
    logging: false,
  }
);

export default sequelize;
