//! DAOS /////////////////////////////////
import { DAOProducts } from "../daos/index.js";
//! DAOS /////////////////////////////////
const controller = {};

//? DEVUELVE TODOS LOS PRODUCTOS

controller.getAll = async (req, res) => {
  const { category } = req.query;
  console.log(category);
  if (!category) {
    const products = await DAOProducts.getAll();
    res.render("products", { products });
  } else {
    const products = await DAOProducts.filterByCategory(category);
    res.render("products", { products });
  }
};

//? DEVUELVE UN PRODUCTO SEGÚN SU ID

controller.getById = async (req, res) => {
  const product = await DAOProducts.getById(req.params.id);

  //! Si el id generado no coincide con ningún producto, devuelve null; de lo contrario, envía la información solicitada
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json({ message: "Product obtained", product });
};

//? RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVE CON SU ID ASIGNADO

controller.post = async (req, res) => {
  const product = await DAOProducts.save(req.body);
  if (!product) throw new Error(error);

  res.status(200).redirect("/products");
};

//? RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID

controller.put = async (req, res) => {
  const { id } = req.params;
  const newObject = req.body;
  const data = await DAOProducts.update(id, newObject);

  data != null
    ? res.status(200).json({
        message: `Producto ${id} modificado con éxito`,
        "new product": newObject,
      })
    : res.status(404).json({ error: "Producto no encontrado" });
};

//? ELIMINA UN PRODUCTO SEGÚN SU ID

controller.delete = async (req, res) => {
  const data = await DAOProducts.deleteById(req.params.id);
  data
    ? res.status(200).send({
        message: "Se ha eliminado el producto",
        "product deleted": data,
      })
    : res.status(404).send({ message: "No se ha encontrado el producto" });
};

export default controller;
