import { productOverview, shippingCost } from "../libs/utils.js";

export default class OrderDTO {
  constructor({ products, subtotal }, owner, email, address) {
    this.owner = owner;
    this.owner_email = email;
    this.owner_address = address;
    this.timestamp = new Date().toLocaleString();
    this.products = productOverview(products);
    this.shipment = +shippingCost(subtotal);
    this.total = subtotal + this.shipment;
  }
}
