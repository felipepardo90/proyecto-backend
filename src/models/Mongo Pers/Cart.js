import mongoose from "mongoose";
import config from "../../config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Cart {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
    this.date = new Date().toLocaleString();
    this.total = 0;
    this.products = Array;
  }

  async newCart() {
    try {
      const newCart = await this.db.create({
        // TODO OPTIMIZAR
        timestamp: this.date,
        products: this.products,
        total: this.total,
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

  async addProductToCart(idEntered, object) {
    // TODO OPTIMIZAR
    try {
      await this.db.updateMany(
        { _id: idEntered },
        {
          $push: {
            products: object[0],
          },
        }
      );

      return await this.db.findOne({ _id: idEntered });
    } catch (error) {
      console.error(`Se produjo un error en addProductToCart:${error}`);
    }
  }

  async deleteProductInCartById(idCart, idProduct) {
    try {
      await this.db.updateOne(
        { _id: idCart },
        {
          $pull: {
            products: { _id: idProduct },
          },
        }
      );

      const data = await this.db.find({ _id: idCart }, { products: 1 });

      console.log("|Í", data, "|Í");
      console.log(
        "|Í",
        data.forEach((elem) => elem.products[0].title),
        "|Í"
      );

      return await data;
    } catch (error) {
      console.error(`Se produjo un error en deleteProductInCartById: ${error}`);
    }
  }
}
