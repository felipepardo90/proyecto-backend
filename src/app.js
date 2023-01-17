import express from "express";
import session from "express-session";
import passport from "passport";
import localStrategy, { Strategy } from "passport-local";
import multer from "multer";
// const upload = multer()
import morgan from "morgan";
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

const app = express();

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
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
// passport.use("signup", new Strategy({

// }(req, username, password, done)))

//! MULTER

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
});

const upload = multer({ storage });

app.get("/prueba", (req, res) => {
  res.render("prueba");
});
app.post("/prueba", upload.single("myFile"), (req, res) => {
  const { file } = req.file;
  res.send(file);
});

//! ROUTES

import indexRoute from "./routes/index.routes.js";
app.use("/", indexRoute); //

//! 404 - Not Found

app.use((req, res) => {
  res.status(404).render("404");
});

export default app;
