//!  DOM ELEMENTS

let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

//! Al cliquear en SEND, se enviará un mensaje al servidor con el evento chat:message, y luego se limpiará el input message

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
    date: new Date().toLocaleString()
  });
  message.value = "";
  message.focus()
  return false;
});

//! El input message escucha al evento keypress(escribiendo) para crear el evento chat:typing

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

//! Luego de enviar mensaje por el chat, se limpiará el actions (muestra el evento chat:typing) y se renderizará el chat, obteniendo por data un Array de mensajes con el evento chat:messages

socket.on("chat:history", (data) => {
  actions.innerHTML = " ";
  output.innerHTML = data
    .map(
      (user) =>
        `<p>
    <strong class="message-user">${
      user.username
    } <span class="message-date">[ ${user.date} ]</span></strong>: <span class="message-txt">${
          user.message
        }</span>
    </p>`
    )
    .join(" ");
    return false
});

//! "Está escribiendo..."

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p></em>${data} Está escribiendo... </p>`;
});
