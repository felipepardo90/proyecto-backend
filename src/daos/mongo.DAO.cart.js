import mongoose from "mongoose";
import Cart from "../models/Mongo Pers/Cart.js";

class DAOCartsMongo extends Cart {
  constructor() {
    super("carts", {
      timestamp: String,
      products: { type: Array, default: [] },
    });
  }
}

export default DAOCartsMongo;
