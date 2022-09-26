const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");

//! ROUTES

const indexRoute = require("./routes/index.routes");

//! SETTINGS

app.set("port", 8080); //! CONFIG port
app.set("json spaces", 2); //! JSON formatter
app.set("views", __dirname + "/views");
app.set("view engine", "hbs"); //! VIEW ENGINES

//! MIDDLEWARES

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "../public"))); //! STATIC FILES
app.use("/", indexRoute); //

//! CONFIGURACIÓN EXTRA HBS

const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "/views/layout/main.hbs"),
    layoutsDir: path.join(__dirname, "./views/layout"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);

module.exports = app;
