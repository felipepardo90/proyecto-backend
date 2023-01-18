import User from "../models/Mongo Pers/User.js";

class DAOUsersMongo extends User {
  constructor() {
    super("users", {
      username: String,
      address: String,
      age: Number,
      phone: Number,
      avatar: String,
      email: String,
      password: String,
    });
  }
}

export default DAOUsersMongo;
