import JWT from "jsonwebtoken";

const PRIVATE_KEY = "cambiooo";
const data = { username: "HOLA" };
const token = JWT.sign({ data: data }, PRIVATE_KEY, { expiresIn: "24h" });

console.log("token: ", token);

JWT.verify(token, PRIVATE_KEY, (err, decoded)=>{
    if (err) return console.log("No está correcto")

    return console.log(decoded)
});
