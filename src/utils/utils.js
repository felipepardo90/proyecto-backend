import JWT from "jsonwebtoken";
import { SECRET } from "../libs/keys.js";

export function generateToken(data) {
  const token = JWT.sign({ user: data }, SECRET);
  token.split(" ")[1]

  return token
}

