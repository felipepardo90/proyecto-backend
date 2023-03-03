import app from "./app.js";
import { ENV } from "./libs/keys.js";

//! STARTING SERVER

const server = app.listen(app.get("port"), () => {
  console.log(`Express server started at ${ENV} environment on port ${app.get("port")}`);
});

//! ERROR HANDLER

server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});
