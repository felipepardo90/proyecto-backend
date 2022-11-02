import express from "express";
import morgan from "morgan";
const app = express();
//! __DIRNAME PATH
import path from "path";
import { fileURLToPath } from "url";
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
//! DOTENV
import * as dotenv from "dotenv";
process.env.NODE_ENV
  ? dotenv.config(`${__dirname}/.env.${process.env.NODE_ENV}`)
  : dotenv.config();

console.log(process.env.TYPE, "type")
console.log(process.env.NUM, "num")

//! SETTINGS

app.set("port", process.env.PORT); //! CONFIG port
app.set("json spaces", 2); //! JSON formatter

//! VIEW ENGINES

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//! MIDDLEWARES

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public"))); //! STATIC FILES

//! ROUTES

import indexRoute from "./routes/index.routes.js";
app.use("/", indexRoute); //

//! 404 - Not Found

app.use((req, res) => {
  res.status(404).render("404");
});

export default app;
