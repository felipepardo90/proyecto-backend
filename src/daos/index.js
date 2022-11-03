// //! __DIRNAME PATH
// import path from "path";
// import { fileURLToPath } from "url";
// const filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(filename);
// //! DOTENV
import * as dotenv from "dotenv";
process.env.NODE_ENV
  ? dotenv.config({path:`.env.${process.env.NODE_ENV}`})
  : dotenv.config();
  console.log(`.env.${process.env.NODE_ENV}`, "ruta en index")

let DAOProducts, DAOCarts

console.log(process.env.TYPE, "type wrong") // TODO wrong

switch (process.env.TYPE) {
    case 'file':
        const { default: DAOProductsFile } = await import('./file.DAO.products.js')
        const { default: DAOCartsFile } = await import('./file.DAO.cart.js')

        DAOProducts = new DAOProductsFile()
        DAOCarts = new DAOCartsFile()
        break
    case 'firebase':
        
        break
    case 'mongodb':
        
        break
    case 'mariadb':
        
        break
    case 'sqlite3':
        
        break
    default:
        
        break
}

export { DAOProducts, DAOCarts }