import mongoose from "mongoose";
import 'dotenv/config';
import { readFileSync } from 'fs';
import { __dirname } from './utils.js';

import PostModel from "./Models/Post.js";
import PassengerModel from "./Models/Passenger.js";
import posts from "./Data/posts.js";

const { APP_ADDRESS_MONGODB, APP_COLLECTION_POSTS_MONGODB } = process.env ;

async function hydrateBootstrap() {
  await mongoose.connect(
    `mongodb://${APP_ADDRESS_MONGODB}/${APP_COLLECTION_POSTS_MONGODB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.set("debug", true);

  const resPost = await PostModel.insertMany(posts);
  const resPassenger = await PassengerModel.insertMany( JSON.parse(readFileSync( __dirname + '/Data/passengers.json' , 'utf-8') ) ) ; 

  return { resPost, resPassenger };
}


hydrateBootstrap().then(console.log).catch(console.error);
