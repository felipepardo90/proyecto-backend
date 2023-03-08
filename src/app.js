import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import passport from "passport";
import flash from "connect-flash";
import indexRoute from "./routes/index.routes.js";
import { PORT, SECRET, MONGO_SESSION } from "./libs/keys.js";
import morgan from "morgan";

//! PATH

import path from "path";
import { fileURLToPath } from "url";
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const app = express();

//! SETTINGS

app.set("port", PORT); //! CONFIG port
app.set("json spaces", 2); //! JSON formatter

//! VIEW ENGINES

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//! MIDDLEWARES

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); //! STATIC FILES
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
    store: MongoStore.create({ mongoUrl: MONGO_SESSION }),
  })
);
app.use(flash());
import "./libs/passport-auth.js"; //! CONFIG PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMsg = req.flash("signup message");
  app.locals.signinMsg = req.flash("signin message");
  app.locals.user = req.user;
  next();
});

//! ROUTES

app.use("/", indexRoute); //

//! 404 - Not Found

app.use((req, res) => {
  res.status(404).render("404");
});

export default app;
