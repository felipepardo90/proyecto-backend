let DAOProducts, DAOCarts

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