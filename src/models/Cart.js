const fs = require("fs");

class Cart {
  constructor(file) {
    this.file = file;
  }

  async newCart() {
    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);

      const newCart = {
        id: dataParsed.length + 1,
        timestamp: new Date().toLocaleString(),
      };

      dataParsed.push(newCart);
      const updatedFile = JSON.stringify(dataParsed, null, " ");
      fs.promises.writeFile(this.file, updatedFile);

      return newCart;
    } catch (error) {
      console.error(`Se produjo un error en newCart:${error}`);
    }
  }

  async deleteCartById(idEntered) {
    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      const leakedCartId = dataParsed.filter(({ id }) => id != idEntered);
      const cartFound = dataParsed.find(({ id }) => id == idEntered);

      if (cartFound) {
        console.log(`Se ha eliminado el carrito con id:${idEntered}`);
        const updatedFile = JSON.stringify(leakedCartId, null, " ");
        fs.promises.writeFile(this.file, updatedFile);
        return cartFound;
      } else {
        console.log(`No se ha encontrado el carrito con id: ${idEntered}`);
      }
    } catch (error) {
      console.error(`Se ha producido un error en deleteCartById: ${error}`);
    }
  }

  async getCartById(idEntered) {
    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      const cartFound = dataParsed.find(({ id }) => id == idEntered);

      if (cartFound) {
        console.log(`Se obtuvo el carrito ${idEntered}`);
        return cartFound;
      } else {
        console.log(`No se ha encontrado el carrito ${idEntered}`);
      }
    } catch (error) {
      console.error(`Se produjo un error en getCartById: ${error}`);
    }
  }

  async addProductToCart(idEntered, object) {
    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      const leakedCartId = dataParsed.filter(({ id }) => id != idEntered);
      const cartFound = dataParsed.find(({ id }) => id == idEntered);

      if (cartFound) {
        const cartFound = { ...object, id: idEntered };
        leakedCartId.push(cartFound);
        const updatedFile = JSON.stringify(leakedCartId, null, " ");
        fs.promises.writeFile(this.file, updatedFile);
        console.log(`Producto ${idEntered} modificado con éxito`, cartFound);
        return cartFound;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Se produjo un error en addProductToCart:${error}`);
    }
  }
}

module.exports = Cart;
