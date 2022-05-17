const asynIterable = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return Promise.resolve({ value: this.i++, done: false });
        }

        return Promise.resolve({ done: true });
      },
    };
  },
};

function* example() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

// for(const num of example()){
//     console.log(num);
// }

function* even(max = 10) {
  let i = 0;
  while (i < max) {
    yield i;
    i = i + 2;
  }
}

// for(const num of even()){
//     console.log(num);
// }

const data = {};

data[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

// for (const num of data) console.log(num);

const products = {
  customer: {
    1: { id: 134, name: "John" },
    2: { id: 13, name: "Alice" },
    3: { id: 14, name: "Alan" },
    4: { id: 130, name: "Kim" },
  },
  food: {
    134: ["Cake", "coffee"],
    13: ["Cake", "coffee"],
    14: ["Cake", "orange"],
    130: ["Apple", "coffee"],
  },
};

// Essayez de créer un itérateur permettant de parcourir l'objet pour afficher ce que mange chaque client

products[Symbol.iterator] = function* () {
  let i = 1;

  while (typeof this.customer[i] !== "undefined") {
    const { id, name } = this.customer[i];
    const foods = this.food[id];
    yield { name, foods };
    i++;
  }
};

for (const num of products) console.log(num);
