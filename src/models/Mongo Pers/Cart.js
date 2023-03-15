import mongoose, { mongo, Mongoose } from "mongoose";
import config from "../../libs/config.js";

await mongoose.connect(config.mongodb.url, config.mongodb.options);

export default class Cart {
  constructor(coll, schema) {
    this.db = mongoose.model(coll, schema);
    this.date = new Date().toLocaleString();
  }

  async newCart() {
    try {
      return await this.db.create({ timestamp: this.date })
    } catch (error) {
      console.error(`Se produjo un error en save:${error}`);
    }
  }

  async deleteCartById(id) {
    try {
      await this.db.deleteOne({ _id: id });
      return id;
    } catch (error) {
      console.error(`Se ha producido un error en deleteCartById: ${error}`);
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.db.find({ _id: id });
      return cart[0];
    } catch (error) {
      console.error(`Se produjo un error en getCartById: ${error}`);
    }
  }

  async addProductToCart(cartId, newProduct) {
    const cart = await this.getCartById(cartId);
    try {
      if (cart.products.some(({ _id }) => _id.toString() === newProduct.id)) {
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

  async removeProductFromCart(cartId, product) {
    if (!mongoose.isValidObjectId(product._id)) return null;

    await this.db.updateOne(
      { _id: cartId },
      { $pull: { products: { _id: mongoose.Types.ObjectId(product._id) } } }
    );
    return product;
  }

  async subtractProductFromCart(cartId, product) {
    const cart = await this.getCartById(cartId);
    const productFound = cart.products.find(
      ({ _id }) => _id.toString() === product.id
    );
    try {
      if (productFound.quantity <= 1) {
        await this.db.updateOne(
          { _id: cartId },
          { $pull: { products: { _id: mongoose.Types.ObjectId(product._id) } } }
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
