//! DAOS /////////////////////////////////
import { DAOProducts, DAOCarts } from "../daos/index.js";
//! DAOS /////////////////////////////////
const controller = {};

controller.newCart = async (req, res) => {
  const userID = req.user._id;
  const data = await DAOCarts.newCart(userID);
  res.status(200).json({
    date: data.timestamp,
    message: "Se ha creado un nuevo carrito",
    id: data.id,
    user_id: data.user_id,
  });
};

controller.deleteCart = async (req, res) => {
  const data = await DAOCarts.deleteCartById(req.params.id);
  data
    ? res.status(200).json({
        message: "Se ha eliminado el carrito",
        "cart deleted": `${req.params.id}`,
      })
    : res
        .status(404)
        .json({ message: "No se ha encontrado el carrito. No existe" });
};

controller.getProductsInCart = async (req, res) => {
  const data = await DAOCarts.getCartById(req.params.id);
  if (data === null) {
    res
      .status(200)
      .json({ error: "Not found", message: "No se encontró el carrito" });
  } else if (data.products.length > 0) {
    res.status(200).json({
      message: "Se obtuvieron los productos del carrito",
      "cart owner": req.user.username,
      "cart id": data.id,
      products: data.products,
    });
  } else {
    res.status(200).json({
      message: "Not found",
      "cart id": data.id,
      products: "El carrito no tiene productos",
    });
  }
};

controller.saveProductInCart = async (req, res) => {
  const productToAdd = await DAOProducts.getById(req.body._id);

  const data = await DAOCarts.addProductToCart(req.params.id, productToAdd[0]);

  data != null
    ? res.status(200).json({
        "cart owner": req.user.username,
        message: "Se añadió un producto al carrito",
        "products in cart": data,
      })
    : res.status(200).json({
        error: "No se puede añadir el producto",
        message: "El carrito no existe",
      });
};

controller.deleteProductInCart = async (req, res) => {
  const { id, id_prod } = req.params;
  const product = await DAOProducts.getById(id_prod);
  const data = await DAOCarts.deleteProductInCartById(id, product[0]);
  data !== undefined
    ? res.status(200).json({
        message: `Se ha eliminado el producto ${data.title} del carrito ${id}`,
      })
    : res.status(200).json({ error: "No existe el producto en el carrito" });
};

export default controller;
