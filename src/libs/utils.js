import JWT from "jsonwebtoken";
import { SECRET } from "./keys.js";

export async function generateToken(data) {
  const token = JWT.sign({ user: data }, SECRET);
  token.split(" ")[1];

  return token;
}

export function subtotalCart(products) {
  return products.reduce((prev, curr) => prev + curr["price"] * curr["quantity"], 0)
}
