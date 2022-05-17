import express from "express";
import session from "express-session";
import path from "path";
import flash from 'connect-flash';
import { fileURLToPath } from "url";
import 'dotenv/config'; 

import flashMessageMiddleware from './middlewares/flashmessage.js';
import customerRouter from './routes/customer.js';
import products from "./../Data/products.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { APP_LOCALHOST:hostname, APP_PORT:port } = process.env ;

// TODO
products[Symbol.asyncIterator] =  async function* () {

  let customer_id = 1;
  while(customer_id <= this.max){
      const { food_id, name } =  await this.get('customer', customer_id);
      const  foods  =  await this.get('food', food_id);
      
      yield  {name, foods };
      customer_id++;
  }
};

(async () =>{ 
  for await(const info of products){
      console.log(info)
  }
})()

app.use(
  session({
    secret: "register123",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(flashMessageMiddleware);

app.use(express.static(path.join(__dirname, "public")));

// Encodage des données envoyées en POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api', customerRouter); // vous pouvez créer un prefix pour vos routes, comme api par exemple
app.use('/', customerRouter);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.listen(port, () => {
  console.log(`Server app listening at http://${hostname}:${port}`);
});
