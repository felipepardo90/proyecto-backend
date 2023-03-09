import { Schema } from "mongoose";
import Chat from "../models/Mongo Pers/Chat.js";

const chatSchema = new Schema({
  date: { type: String },
  username: { type: String },
  message: { type: String },
});


export default class DAOChatsMongo extends Chat {
  constructor() {
    super("chats", chatSchema);
  }
}
