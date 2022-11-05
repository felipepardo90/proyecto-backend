import MongoContainer from "../models/Mongo Pers/Container.js";

class DAOProductsMongo extends MongoContainer {
  constructor() {
    super("products", {
      title: String,
      price: Number,
      thumbnail: String,
      description: String,
      code: String,
      stock: Number,
      timestamp: String,
    });
  }
}

export default DAOProductsMongo;
