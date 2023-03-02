import JWT from "jsonwebtoken";

export function generateToken(data) {
  return JWT.sign({ user: data }, "top_secret");
}

