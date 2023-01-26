import { Schema } from "mongoose";
import User from "../models/Mongo Pers/User.js";

const userSchema = new Schema({
  username: { type: String },
  //   address: String,
  //   age: Number,
  //   phone: Number,
  //   avatar: String,
  email: { type: String },
  password: { type: String },
});


export default class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}
