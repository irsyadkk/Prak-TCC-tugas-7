import sequelize, { Sequelize } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "user",
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT
  },{
    freezeTableName:true
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;
