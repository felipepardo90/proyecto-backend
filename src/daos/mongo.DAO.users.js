import { Schema } from "mongoose";
import bcrypt from "bcrypt";
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

userSchema.methods.encryptPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePass = (password) => {
  return bcrypt.compareSync(password, this.password);
};

class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}

export default DAOUsersMongo;
