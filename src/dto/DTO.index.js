let dataProduct, dataCart

const { default: ProductDTO } = await import("./DTO.products.js");
const { default: CartDTO } = await import("./DTO.cart.js");

dataProduct = new ProductDTO();
dataCart = new CartDTO();

export { dataProduct, dataCart };


