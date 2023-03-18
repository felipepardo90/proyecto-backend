import mongoose, { Schema } from "mongoose";
import User from "../models/Mongo Pers/User.js";

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  username: { type: String, required: true },
  role: { type: String },
  password: { type: String, required: true },
  cart_id:{type:mongoose.Schema.Types.ObjectId, ref:"carts"}
});


export default class DAOUsersMongo extends User {
  constructor() {
    super("users", userSchema);
  }
}
