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

customerFoods[Symbol.asyncIterator] =  async function* () {

    let customer_id = 1;
    while(customer_id <= this.max){
        const { food_id, name } =  await this.get('customer', customer_id);
        const  foods  =  await this.get('food', food_id);
        
        yield  {name, foods };
        customer_id++;
    }
  };
  
  (async () =>{ 
    for await(const info of customerFoods){
        console.log(info)
    }
  })()