import * as dotenv from "dotenv";
dotenv.config();

export let PORT;
export let MONGODB_URI
export let MONGO_SESSION
export let ENV
export let USER_EMAIL = process.env.USER_EMAIL
export let PASS_EMAIL = process.env.PASS_EMAIL
export let SECRET = process.env.SECRET;
switch (process.env.NODE_ENV) {
  case "prod":
    PORT = process.env.PORT;
    MONGODB_URI = process.env.MONGODB_URI
    MONGO_SESSION = process.env.MONGO_SESSION
    ENV = process.env.NODE_ENV
    break;

  default:
    PORT = 8000;
    MONGODB_URI = "mongodb://localhost:27017/ecommerce"
    MONGO_SESSION = "mongodb://localhost:27017/sessions"
    ENV = "dev"
    break;
}


