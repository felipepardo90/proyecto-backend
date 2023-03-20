function generarRandom() {
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

console.log(generarRandom());
