import app from "./app.js";
import { ENV } from "./libs/keys.js";
import { DAOChats } from "./daos/index.js";

//! WEBSOCKETS
import { Server as WebSocketServer } from "socket.io";
import http from "http";
const server = http.createServer(app);
export const io = new WebSocketServer(server);

//! STARTING SERVER

server.listen(app.get("port"), () => {
  console.log(`Express server started at ${ENV} environment on port ${app.get("port")}`);
});

//! ERROR HANDLER

server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});

io.on("connection", async (socket) => {
  //! Nueva conexión
  console.log(`New Connection: ${socket.id}`);

  //! CHAT

  //! El evento chat:messages iniciará enviando el array existente al cliente
  const allMessages = await DAOChats.readMessages();
  socket.emit("chat:history", allMessages);

  //! Se escucha el evento chat:message, se guarda el mensaje recibido por el cliente y se emite un mensaje general con el array Messages actualizado a todos los sockets conectados y por conectarse

  socket.on("chat:message", async (data) => {
    const allMessages = await DAOChats.saveMessage(data);
    io.sockets.emit("chat:history", allMessages);
  });

  //! Se escucha el evento chat:typing y se emite un mensaje a todos los sockets conectados, excepto al que "está escribiendo..." con el método broadcast

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});

// export default io