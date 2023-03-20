import MongoContainer from "../models/Mongo Pers/Container.js";

class DAOProductsMongo extends MongoContainer {
  constructor() {
    super("products", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      stock: { type: Number, required: true },
      code: { type: String },
      timestamp: { type: String },
    });
  }

  filterByCategory(category) {
    try {
      return this.db.find({ category: category });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default DAOProductsMongo;
