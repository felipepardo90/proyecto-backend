import { productOverview, shippingCost } from "../libs/utils.js";

export default class OrderDTO {
  constructor({ products, subtotal }, owner, address, email) {
    this.owner = owner;
    this.owner_email = email;
    this.owner_address = address;
    this.date = new Date().toLocaleString();
    this.products = productOverview(products);
    this.shipment = +shippingCost(subtotal);
    this.total = subtotal + this.shipment;
  }
}
