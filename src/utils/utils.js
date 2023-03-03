import JWT from "jsonwebtoken";
import { SECRET } from "../libs/keys.js";

export function generateToken(data) {
  return JWT.sign({ user: data }, SECRET);
}

