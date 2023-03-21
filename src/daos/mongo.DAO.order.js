import Order from "../models/Mongo Pers/Order.js";

class DAOOrdersMongo extends Order {
  constructor() {
    super("orders", {
      owner: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      date: { type: String },
      products: { type: Array, required: true },
      shipment: { type: Number, required: true },
      total: { type: Number, required: true },
    });
  }
}

export default DAOOrdersMongo;
