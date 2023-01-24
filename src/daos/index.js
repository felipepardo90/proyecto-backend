let DAOProducts, DAOCarts;

const { default: DAOProductsMongo } = await import("./mongo.DAO.products.js");
const { default: DAOCartsMongo } = await import("./mongo.DAO.cart.js");
import DAOUsers from "./mongo.DAO.users.js";

DAOProducts = new DAOProductsMongo();
DAOCarts = new DAOCartsMongo();

export { DAOProducts, DAOCarts, DAOUsers };
