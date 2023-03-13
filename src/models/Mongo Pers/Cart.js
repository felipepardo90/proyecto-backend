import mongoose from "mongoose";
import config from "../../libs/config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Cart {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
    this.date = new Date().toLocaleString();
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
    const cart = await this.getCartById(cartId);

    try {
      if (cart.products.some(({ _id }) => _id === mongoose.Types.ObjectId(newProduct._id))) {
        await this.db.updateOne(
          { _id: cartId, "products._id": newProduct._id },
          { $inc: { "products.$.quantity": +1 } }
        );
      } else {
        await this.db.updateOne(
          { _id: cartId },
          { $push: { products: newProduct } }
        );
        await this.db.updateOne(
          { _id: cartId, "products._id": newProduct._id },
          { $set: { "products.$.quantity": 1 } }
        );
      }

      return await this.db.findOne({ _id: cartId });
    } catch (error) {
      console.error(`Se produjo un error en addProductToCart:${error}`);
    }
  }

  async deleteProductInCartById(cartId, product) {
    const cart = await this.getCartById(cartId);
    const productFound = cart.products.find(
      ({ _id }) => _id === mongoose.Types.ObjectId(product._id)
    );
    try {
      if (productFound.quantity <= 1) {
        await this.db.updateOne(
          { _id: cartId },
          { $pull: { products: { _id: product._id } } }
        );
        return null;
      } else {
        await this.db.updateOne(
          { _id: cartId, "products._id": product._id },
          { $inc: { "products.$.quantity": -1 } }
        );
        return await this.db.findOne({ _id: cartId });
      }
    } catch (error) {
      console.error(`Se produjo un error en deleteProductInCartById: ${error}`);
    }
  }
}
