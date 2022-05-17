const customerFoods =  {
  products: {
    customer: {
      1: { food_id: 134, name: "John" },
      2: { food_id: 13, name: "Alice" },
      3: { food_id: 14, name: "Alan" },
      4: { food_id: 130, name: "Kim" },
    },
    food: {
      134: ["Cake", "coffee"],
      13: ["Cake", "coffee"],
      14: ["Cake", "orange"],
      130: ["Apple", "coffee"],
    },
  },
  max: 4,
  get: (key, id) =>  delay(500).then(() => customerFoods.products[key][id]),
};

function delay(ms, context) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default customerFoods;
