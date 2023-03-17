import { DAOProducts, DAOCarts } from "../daos/index.js";
import CartDTO from "../dto/DTO.cart.js";
const controller = {};

controller.newCart = async (req, res) => {
  const newCart = await DAOCarts.newCart();
  console.log(newCart);
  res.status(200).json({
    message: "Se ha creado un nuevo carrito",
    id: newCart.id,
    user_id: newCart.user_id,
  });
};

controller.getCartById = async (req, res) => {
  const { id } = req.params;
  const data = await DAOCarts.getCartById(id);
  const cart = new CartDTO(data.products);
  // res.status(200).json({
  //   message: "Carrito obtenido",
  //   "cart owner": req.user.username,
  //   cart,
  // });

  res.render("cart", { cart: cart });
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

  try {
    await DAOCarts.addProductToCart(req.params.id, productToAdd);
    res.status(200)
  } catch (error) {
    console.log(error);
  }
};

controller.removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  const product = await DAOProducts.getById(req.body._id);

  try {
    await DAOCarts.removeProductFromCart(id, product);
    res.status(200).redirect(`/cart/${id}`);
  } catch (error) {
    console.log(error);
  }
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
