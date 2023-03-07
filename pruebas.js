const array = [
  {
    id: 1,
    productos: [
      { tipo: "banana", precio: 3 },
      { tipo: "pera", precio: 2 },
    ],
  },
  {
    id: 2,
    productos: [
      { tipo: "manzana", precio: 4 },
      { tipo: "banana", precio: 3 },
    ],
  },
];

const newArray = array[1].productos.map(({ precio }) => precio);
const total = newArray.reduce((acc, act) => acc + act, 0);

console.log(total);
