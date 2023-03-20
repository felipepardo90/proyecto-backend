import { Schema } from "mongoose";
import Chat from "../models/Mongo Pers/Chat.js";

const chatSchema = new Schema({
  date: { type: String },
  username: { type: String, required: true },
  message: { type: String, required: true },
});

export default class DAOChatsMongo extends Chat {
  constructor() {
    super("chats", chatSchema);
  }
}
