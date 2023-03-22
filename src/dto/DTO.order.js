import { productOverview, shippingCost } from "../libs/utils.js";

export default class OrderDTO {
  constructor({ products, subtotal }, { city, address, CP }, owner, email) {
    this.owner = owner;
    this.email = email;
    this.city = city;
    this.address = address;
    this.CP = CP;
    this.date = new Date().toLocaleString();
    this.products = productOverview(products);
    this.shipment = +shippingCost(subtotal);
    this.total = subtotal + this.shipment;
  }
}
