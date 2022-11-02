import FilesContainer from "../models/Files Pers/Container.js"

class DAOProductsFile extends FilesContainer {

    constructor() {
        super('src/db/products.json')
    }
}

export default DAOProductsFile
