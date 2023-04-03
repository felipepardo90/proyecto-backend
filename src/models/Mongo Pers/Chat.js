import mongoose from "mongoose";
import config from "../../libs/config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Chat {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
  }

  async saveMessage(messageInfo) {
    try {
      await this.db.create({ ...messageInfo, timestamp: this.date });
      console.log(this.db.find({}));
      return await this.db.find({});
    } catch (error) {
      console.error(`Se produjo un error en saveMessage:${error}`);
    }
  }

  async readMessages() {
    try {
      return await this.db.find({});
    } catch (error) {
      console.error(`Se produjo un error en readMessages:${error}`);
    }
  }
}
