import express from "express";
import session from "express-session";
import path from "path";
import flash from 'connect-flash';
import { fileURLToPath } from "url";
import 'dotenv/config'; 

import authors from './Data/authors.js';
import posts from './Data/posts.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { APP_LOCALHOST:hostname, APP_PORT:port } = process.env ;

app.use(
  session({
    secret: "register123",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
    // faire quelque chose si ça ne marche pas je te redirige vers une page, l'histoire s'arrête là 
    // si cela se passe bien on passe à la suite

    res.locals.flash_message = req.flash("success_message")[0]

    console.log(res.locals);

    next();
})

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Encodage des données envoyées en POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

  res.render("posts/home", {
    posts: posts.filter((p) => p.priority === "important"),
    authors,
  });
});

app.get("/posts", (req, res) => {
  res.render("posts/index", { posts, authors });
});

app.get("/search", (req, res) => {
  
  res.render("authors/search", { authors });
});

app.post("/search", (req, res) => {
  const { name } = req.body;

  if (authors.filter((a) => a === name.trim()).length > 0) {
    req.flash("success_message", { type : "success", content : `L'auteur ${name} existe.` } );

    res.redirect("/");

    return;
  }

  req.flash("success_message", { type : "danger", content : `L'auteur ${name} n'existe pas.` });

  res.redirect("/search");
});

app.listen(port, () => {
  console.log(`Server app listening at http://${hostname}:${port}`);
});
