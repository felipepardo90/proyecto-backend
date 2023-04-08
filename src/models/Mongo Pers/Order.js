import mongoose from "mongoose";
import config from "../../libs/config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Order {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
  }

  async saveOrder(order) {
    try {
      return await this.db.create(order);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrders(id) {
    try {
      return await this.db.find({ owner_id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOrderById(id) {
    try {
      if (!mongoose.isValidObjectId(id)) return false;
      const order = await this.db.find({ _id: id });
      return order[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
