//! WEBSOCKETS
import io from "../server.js";

let controller = {}

io.emit("connection", socket => {
    controller.renderChat = async (req, res) => {
        socket.on("chat:history", messages => {
            res.render("chat", { messages: messages })
        })
    };

    controller.sendMessage = async (req, res) => {
        const { message } = req.body
        const username = req.user.email

        socket.emit("chat:message", {
            username,
            message,
            date: new Date().toLocaleString()
        });
    };
})

export default controller