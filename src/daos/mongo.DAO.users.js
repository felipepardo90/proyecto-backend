import User from "../models/Mongo Pers/User.js";

class DAOUsersMongo extends User {
  constructor() {
    super("users", {
      username: String,
      password: String,
      email: String,
    });
  }
}

export default DAOUsersMongo;
