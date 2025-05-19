import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Note = db.define('notes',{
    userId: Sequelize.INTEGER,
    title: Sequelize.STRING,
    content: Sequelize.STRING,
},{
    freezeTableName:true
});

db.sync().then(() => console.log("Database synced"));

export default Note;