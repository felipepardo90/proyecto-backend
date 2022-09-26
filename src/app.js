const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");

//! SETTINGS

app.set("port", 8080 || process.env.port); //! CONFIG port
app.set("json spaces", 2); //! JSON formatter

//! MIDDLEWARES

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
// app.use("/", express.static(path.join(__dirname, "../public"))); //! STATIC FILES
//! ROUTES
const indexRoute = require("./routes/index.routes");
app.use("/api", indexRoute); //

module.exports = app;
