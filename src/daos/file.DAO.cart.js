import Carts from "../models/Files Pers/Cart.js"

class DAOCartsFile extends Carts {

    constructor() {
        super('src/db/cart.json')
    }
}

export default DAOCartsFile
