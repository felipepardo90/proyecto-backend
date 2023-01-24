import mongoose from "mongoose";
import config from "../../config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class User {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
  }
  async createUser(newUser) {
    try {
      return await this.db.create(newUser);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserByUsername(username) {
    try {
      await this.db.findOne({ username }, (err, user) => {
        console.log(err);
        return user;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findById(id) {
    try {
      return await this.db.findById({ _id: id });
    } catch (err) {
      throw new Error(err);
    }
  }
}
