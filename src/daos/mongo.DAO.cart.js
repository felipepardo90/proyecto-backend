import Cart from "../models/Mongo Pers/Cart.js";

class DAOCartsMongo extends Cart {
  constructor() {
    super("carts", {
      timestamp: String,
      products: Array,
      total: Number,
    });
  }
}

export default DAOCartsMongo;
