import JWT from "jsonwebtoken";
import { SECRET } from "./keys.js";

export async function generateToken(data) {
  const token = JWT.sign({ user: data }, SECRET);
  token.split(" ")[1];
  
  return token;
}
