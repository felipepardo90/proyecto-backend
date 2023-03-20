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

export function randomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  let ch;
  while (result.length < 12) {
    ch = characters.charAt(Math.floor(Math.random() * charactersLength));
    if (!result.includes(ch)) {
      result += ch;
    }
  }
  return result;
}
