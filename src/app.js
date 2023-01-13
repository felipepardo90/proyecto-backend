import express from "express";
import session from "express-session";
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
const users = [];
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

//* Register

app.get("/register", (req, res) => {
  {
    res.send("HOla Mundoooo");
  }
});
app.post("/register", (req, res) => {
  {
    const { username, password, email } = req.body;
    const user = users.find(({ username }) => username == username);

    if (user) return res.send({ error: true, msg: "Username already exists" });

    users.push({ username, password, email });
    // res.redirect("/login");
    res.send({ error: false, msg: "¡User created succesfully!" });
  }
});
//* Login

app.get("/login", (req, res) => {});

app.post("login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    ({ username, password }) => username == username && password == password
  );

  if (!user) return res.send({ error: true, msg: "User not found" });
  req.session.username = username;
  // res.redirect("/profile");
  res.send({ error: false, message: `Bienvenido ${req.session.username}` });
});

//* Logout

//* Data

const authMW = (req, res, next) => {
  req.session.username
    ? next()
    : res.send({ error: true, msg: "Login failed" });
};

app.get("/profile", authMW, (req, res) => {
  const user = users.find(({ username }) => (username = req.session.username));
  res.send({ error: false, data: user });
});

export default app;
