let dataProduct, dataCart

const { default: ProductDTO } = await import("./DTO.products.js");
const { default: CartDTO } = await import("./DTO.cart.js");

export { ProductDTO, CartDTO };


