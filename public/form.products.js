const socket = io();

const form = document.querySelector("#products-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");

//! Función asíncrona para renderizar template en HBS

async function render(products) {
  //? renderizar handlebars
  const response = await fetch("./form.products.hbs");
  const template = await response.text();
  const HBStemplate = Handlebars.compile(template);
  const html = HBStemplate({ products: products });
  document.querySelector("#output-products").innerHTML = html;
}

//!  Evento submit del formulario de envío de productos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //! Nuevo objeto enviado mediante el evento product:new
  socket.emit("product:new", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });
  //! Se vacía el contenido de cada input luego de envíado el objeto
  title.value = "";
  price.value = "";
  thumbnail.value = "";
});

//! El evento product:all bbtendrá todos los productos, y ejecturará la función render para mostrar los elementos traídos en una tabla dinámica
socket.on("product:all", (products) => {
  render(products);
});

//! Finalizando el evento submit del formulario, el servidor consultará en la BD si el producto envíado ya existe en el servidor mediante el evento product:submit
socket.on("product:submit", (data) => {
  //! Informará mediante un alert cuando se agregue un producto nuevo, o si ya existe
  data.status === true
    ? alert(`Ya existe el producto ${data.product.title} en el sistema`)
    : alert(`Se ha agregado el producto ${data.product.title}`);
});
