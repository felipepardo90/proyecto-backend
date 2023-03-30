import mongoose from "mongoose";
import Order from "../models/Mongo Pers/Order.js";

class DAOOrdersMongo extends Order {
  constructor() {
    super("orders", {
      owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      owner: { type: String, required: true },
      email: { type: String },
      address: { type: String },
      date: { type: String },
      products: { type: Array, required: true },
      shipment: { type: Number, required: true },
      total: { type: Number, required: true },
    });
  }
}

export default DAOOrdersMongo;
