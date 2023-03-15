import { DAOProducts, DAOCarts } from "../daos/index.js";
import CartDTO from "../dto/DTO.cart.js";
const controller = {};

controller.newCart = async (req, res) => {
  const newCart = await DAOCarts.newCart();
  console.log(newCart)
  res.status(200).json({
    message: "Se ha creado un nuevo carrito",
    id: newCart.id,
    user_id: newCart.user_id,
  });
};

controller.getCartById = async (req, res) => {
  const { id } = req.params;
  const data = await DAOCarts.getCartById(id);
  const cart = new CartDTO(req.user.id, data.products);
  res.status(200).json({
    message: "Carrito obtenido",
    "cart owner": req.user.username,
    cart,
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
  const cart = await DAOCarts.getCartById(req.params.id);
  if (!cart) {
    res
      .status(200)
      .json({ error: "Not found", message: "No se encontró el carrito" });
  } else if (cart.products.length > 0) {
    res.status(200).json({
      message: "Se obtuvieron los productos del carrito",
      "cart owner": req.user.username,
      "cart id": cart.id,
      products: cart.products,
    });
  } else {
    res.status(200).json({
      message: "Products not found",
      "cart id": cart.id,
      products: "El carrito no tiene productos",
    });
  }
};

controller.saveProductInCart = async (req, res) => {
  const productToAdd = await DAOProducts.getById(req.body._id);
  const cart = await DAOCarts.addProductToCart(req.params.id, productToAdd);

  cart != null
    ? res.status(200).json({
        "cart owner": req.user.username,
        message: "Se añadió un producto al carrito",
        "products in cart": cart.products,
      })
    : res.status(200).json({
        error: "No se puede añadir el producto",
        message: "El producto no se ha encontrado o el carrito no existe",
      });
};

controller.removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  const product = await DAOProducts.getById(req.body._id);
  const productToRemove = await DAOCarts.removeProductFromCart(id, product);

  productToRemove
    ? res
        .status(200)
        .json({ message: "Se ha eliminado el producto del carrito" })
    : res.json({ message: "Product not found" });
};

controller.subtractProductFromCart = async (req, res) => {
  const { id, id_prod } = req.params;
  const productToRemove = await DAOProducts.getById(id_prod);
  const cart = await DAOCarts.subtractProductFromCart(id, productToRemove);
  cart !== null
    ? res.status(200).json({
        message: `Quitando ${productToRemove.title} del carrito de ${id}`,
        "cart owner": req.user.username,
        "cart id": cart.id,
        "products in cart": cart.products,
      })
    : res.status(200).json({
        message: "No existe el producto en el carrito",
        "cart owner": req.user.username,
      });
};

export default controller;
