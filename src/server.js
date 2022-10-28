import app from "./app.js";

//! STARTING SERVER

const server = app.listen(app.get("port"), () => {
  console.log(`Express server started on port ${app.get("port")}`);
});

//! ERROR HANDLER

server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});
