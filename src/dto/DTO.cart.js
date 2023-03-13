import { subtotalCart } from "../libs/utils.js"

export default class CartDTO {
    constructor(id, products) {
        this.id = id
        this.products = products
        this.subtotal = subtotalCart(this.products)
    }

}