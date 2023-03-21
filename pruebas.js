const products = [
  {
    title: "Guitarra",
    price: 2351,
    thumbnail: "guitarra.jpg",
    quantity: 3,
  },
  {
    title: "Bajo",
    price: 1231,
    thumbnail: "bajo.jpg",
    quantity: 4,
  },
  {
    title: "Violín",
    price: 1500,
    thumbnail: "violín.jpg",
    quantity: 1,
  },
  {
    title: "Flauta",
    price: 774,
    thumbnail: "flauta.jpg",
    quantity: 2,
  },
];

function eachProducts(array) {
  const each = array.map((item) => {
    return { title: item.title, price: item.price, qty: item.quantity };
  });
  return each;
}

console.log(eachProducts(products));
