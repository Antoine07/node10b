import express from "express";
import session from "express-session";
import flash from 'connect-flash';
import { __dirname, pathViews, pathPublic } from './utils.js';

import 'dotenv/config'; 
import mongoose from "mongoose";

import flashMessageMiddleware from './middlewares/flashmessage.js';
import customerRouter from './routes/customer.js';

const app = express();
const { APP_LOCALHOST:hostname, APP_PORT:port, APP_ADDRESS_MONGODB, APP_COLLECTION_POSTS_MONGODB } = process.env ;

mongoose.connect(
  `mongodb://${APP_ADDRESS_MONGODB}/${APP_COLLECTION_POSTS_MONGODB}`, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
  }
)

app.use(
  session({
    secret: "register123",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(flashMessageMiddleware);

app.use(express.static(pathPublic));

// Encodage des données envoyées en POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api', customerRouter); // vous pouvez créer un prefix pour vos routes, comme api par exemple
app.use('/', customerRouter);
app.set("view engine", "pug");
app.set("views", pathViews);


app.listen(port, () => {
  console.log(`Server app listening at http://${hostname}:${port}`);
});
