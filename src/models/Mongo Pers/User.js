import mongoose from "mongoose";
import config from "../../config.js";

await mongoose.connect(`${config.mongodb.url}/sessions`, config.mongodb.options);

// export default class User {
//   constructor(coll, schema) {
//     this.db = mongoose.model(coll, schema);
//     this.date = new Date().toLocaleString();
//     this.total = 0;
//     this.products = Array;
//   }}