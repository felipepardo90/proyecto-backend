//! DOTENV
import * as dotenv from "dotenv";
process.env.NODE_ENV
  ? dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
  : dotenv.config();

let DAOProducts, DAOCarts;

switch (process.env.TYPE) {
  case "firebase":
    break;
  case "mongodb":
    const { default: DAOProductsMongo } = await import("./mongo.DAO.products.js");
    const { default: DAOCartsMongo } = await import("./mongo.DAO.cart.js");

    DAOProducts = new DAOProductsMongo();
    DAOCarts = new DAOCartsMongo();
    break;

  default:
    const { default: DAOProductsFile } = await import("./file.DAO.products.js");
    const { default: DAOCartsFile } = await import("./file.DAO.cart.js");

    DAOProducts = new DAOProductsFile();
    DAOCarts = new DAOCartsFile();
    break;
}

export { DAOProducts, DAOCarts };
