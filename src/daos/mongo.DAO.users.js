import { Schema } from "mongoose";
import User from "../models/Mongo Pers/User.js";

const userSchema = new Schema({
  username: String,
  //   address: String,
  //   age: Number,
  //   phone: Number,
  //   avatar: String,
  email: String,
  password: String,
});

export default class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}
