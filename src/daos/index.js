let DAOProducts, DAOCarts, DAOUsers;

const { default: DAOProductsMongo } = await import("./mongo.DAO.products.js");
const { default: DAOCartsMongo } = await import("./mongo.DAO.cart.js");
const { default: DAOUsersMongo } = await import("./mongo.DAO.users.js");

DAOProducts = new DAOProductsMongo();
DAOCarts = new DAOCartsMongo();
DAOUsers = new DAOUsersMongo();

export { DAOProducts, DAOCarts, DAOUsers };
