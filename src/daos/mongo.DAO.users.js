import { Schema } from "mongoose";
import User from "../models/Mongo Pers/User.js";

const userSchema = new Schema({
  fullname: { type: String },
  phone: { type: Number },
  email: { type: String },
  username: { type: String },
  password: { type: String },
});


export default class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}
