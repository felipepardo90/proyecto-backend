import mongoose from "mongoose";
import { DAOCarts } from "../../daos/index.js";
import config from "../../libs/config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Cart {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
    this.date = new Date().toLocaleString();
    this.products = Array;
  }

  async newCart(userID) {
    try {
      const newCart = await this.db.create({
        // TODO OPTIMIZAR
        timestamp: this.date,
        user_id: userID,
      });
      return newCart;
    } catch (error) {
      console.error(`Se produjo un error en save:${error}`);
    }
  }

  async deleteCartById(idEntered) {
    // TODO OPTIMIZAR
    try {
      await this.db.deleteOne({ _id: idEntered });
      return idEntered;
    } catch (error) {
      console.error(`Se ha producido un error en deleteCartById: ${error}`);
    }
  }

  async getCartById(idEntered) {
    // TODO OPTIMIZAR
    try {
      const data = await this.db.find({ _id: idEntered });
      return data[0];
    } catch (error) {
      console.error(`Se produjo un error en getCartById: ${error}`);
    }
  }

  async addProductToCart(cartId, newProduct) {
    // const cart = DAOCarts.getCartById(cartId);
    // console.log("CART >>>>>>>>>>>>>>", cart);
    // const productIndex = cart.products.findIndex(
    //   ({ _id }) => _id === newProduct._id
    // );
    // console.log("productIndex", productIndex);
    try {
      await this.db.updateOne(
        { _id: cartId },
        { $push: { products: newProduct } }
      );

      return await this.db.findOne({ _id: cartId });
    } catch (error) {
      console.error(`Se produjo un error en addProductToCart:${error}`);
    }
  }

  async deleteProductInCartById(cartId, product) {
    try {
      await this.db.updateOne(
        { _id: cartId },
        { $pull: { products: { _id: product._id } } }
      );
      return product;
    } catch (error) {
      console.error(`Se produjo un error en deleteProductInCartById: ${error}`);
    }
  }
}
