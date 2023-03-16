import { subtotalCart } from "../libs/utils.js";

export default class CartDTO {
  constructor(products) {
    this.products = products;
    this.subtotal = subtotalCart(this.products) 
  }
}
