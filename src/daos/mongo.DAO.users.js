import { Schema } from "mongoose";
import User from "../models/Mongo Pers/User.js";

const userSchema = new Schema({
  fullname: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String }
});


export default class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}
