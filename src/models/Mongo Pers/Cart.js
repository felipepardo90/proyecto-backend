import mongoose from "mongoose";
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
        timestamp: this.date, user_id: userID
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

  async addProductToCart(cartId, productId) {

    try {
      await this.db.updateMany(
        { _id: cartId },
        {
          $push: {
            products: productId,
          },
        }
      );

      return await this.db.findOne({ _id: cartId });
    } catch (error) {
      console.error(`Se produjo un error en addProductToCart:${error}`);
    }
  }

  async deleteProductInCartById(cartId, productId) {
    try {
      await this.db.updateOne(
        { _id: cartId },
        {
          $pull: {
            products: { _id: productId },
          },
        }
      );

      const data = await this.db.find({ _id: cartId }, { products: 1 });
      const productsInData = data[0].products;
      const productFound = productsInData.find(({ _id }) => (_id == productId));

      // console.log("|Í", data, "|Í");
      // console.log("|Í", productsInData, "|Í");
      // console.log(
      //   "|Í",
      //   productsInData.find(({ _id }) => _id = idProduct),
      //   "|Í"
      // );

      return productFound;
    } catch (error) {
      console.error(`Se produjo un error en deleteProductInCartById: ${error}`);
    }
  }
}
