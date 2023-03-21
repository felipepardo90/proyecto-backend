let DAOProducts, DAOCarts, DAOUsers, DAOChats, DAOOrders;

const { default: DAOProductsMongo } = await import("./mongo.DAO.products.js");
const { default: DAOCartsMongo } = await import("./mongo.DAO.cart.js");
const { default: DAOUsersMongo } = await import("./mongo.DAO.users.js");
const { default: DAOChatsMongo } = await import("./mongo.DAO.chat.js");
const { default: DAOOrdersMongo } = await import("./mongo.DAO.order.js");

DAOProducts = new DAOProductsMongo();
DAOCarts = new DAOCartsMongo();
DAOUsers = new DAOUsersMongo();
DAOChats = new DAOChatsMongo();
DAOOrders = new DAOOrdersMongo();

export { DAOProducts, DAOCarts, DAOUsers, DAOChats, DAOOrders };
