import { Schema } from "mongoose";
import bcrypt from "bcrypt";
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

userSchema.encryptPass = async (password) => {
  return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.validatePass = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

export default class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}
