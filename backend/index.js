import express from "express";
import cors from "cors";
import noteRoute from "./routes/NoteRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'https://frontend-notes-176-dot-xenon-axe-450704-n3.uc.r.appspot.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(noteRoute);

app.listen(5000, () => console.log("Connected to server"));