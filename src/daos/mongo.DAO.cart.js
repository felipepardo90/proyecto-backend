import mongoose from "mongoose";
import Cart from "../models/Mongo Pers/Cart.js";

class DAOCartsMongo extends Cart {
  constructor() {
    super("carts", {
      owner_id:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
      timestamp: String,
      products: { type: Array, default: [] },
    });
  }
}

export default DAOCartsMongo;
