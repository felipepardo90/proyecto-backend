import Cart from "../models/Mongo Pers/Cart.js";

class DAOCartsMongo extends Cart {
  constructor() {
    super("carts", {
      user_id:String,
      timestamp: String,
      products: {type: Array, default:[]},
    });
  }
}

export default DAOCartsMongo;
