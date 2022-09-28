//! CONTENEDOR /////////////////////////////////
const Container = require("../models/Container");
const contenedor = new Container("src/db/products.json");

const Cart = require("../models/Cart");
const cart = new Cart("src/db/cart.json");
//! CONTENEDOR /////////////////////////////////
const controller = {};

controller.newCart = async (req, res) => {
  const data = await cart.newCart();
  res
    .status(200)
    .json({
      date: `${data.timestamp}`,
      message: "Se ha creado un nuevo carrito",
      id: `${data.id}`,
    });
};

controller.delete = async (req, res) => {
    const data = await cart.deleteCartById(req.params.id);
    data
      ? res.status(200).json({
          message: `Se ha eliminado el carrito`,
          "cart deleted": `${req.params.id}`,
        })
      : res.status(404).json({ message: "No se ha encontrado el carrito. No existe" });
  };

  controller.getProducts = async (req, res)=>{
    const data = await cart.getCartById(req.params.id)
    data?
    res.status(200).json({
        message: "Se obtuvieron los productos del carrito",
        id:`${req.params.id}`,
        products:data
    }) :
    res.status(401).json({
        message: "El carrito no tiene productos" //FIXME REVISAR LUEGO
    })
  }

// controller.productsInCart = async(req, res)=>{}

module.exports = controller;
