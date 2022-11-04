import mongoose from "mongoose";
import config from "../../config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Container {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
    this.date = new Date().toLocaleString();
  }

  async save(object) {
    try {
      await this.db.create(object);
      return object;
    } catch (error) {
      console.error(`Se produjo un error en save:${error}`);
    }
  }

  async update(idEntered, object) {
    try {
      await this.db.replaceOne({ _id: idEntered }, { $set: object });
    } catch (error) {
      console.error(`Se produjo un error en update:${error}`);
    }
  }

  async getById(idEntered) {
    try {
      const data = this.db.find({ _id: idEntered });
      return data;
    } catch (error) {
      console.error(`Se produjo un error en getByID: ${error}`);
    }
  }

  async getAll() {
    try {
      const data = await this.db.find({});
      return data;
    } catch (error) {
      console.error(`Se ha producido un error en getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    try {
      const { i, iDeleted } = this.db.deleteOne({ _id: idEntered });
      return iDeleted > 0;
    } catch (error) {
      console.error(`Se ha producido un error en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.db.deleteMany({});
    } catch (error) {
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}
