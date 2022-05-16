import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;
const hostname = "localhost";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
  session({
    secret: "register123",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const posts = [
  { title: "Pug", date: "2022-04-21", priority: "important" },
  { title: "Express", date: "2022-04-22", priority: "normal" },
  { title: "Node.js", date: "2022-04-23", priority: "important" },
];

const authors = ["alan", "alice"];

// Encodage des données envoyées en POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.session);
  
  res.render("posts/home", {
    posts: posts.filter((p) => p.priority === "important"),
    authors,
  });
});

app.get("/posts", (req, res) => {
  res.render("posts/index", { posts, authors });
});

app.get("/search", (req, res) => {
  console.log(req.session);
  res.render("authors/search", { authors });
});

app.post("/search", (req, res) => {
  const { name } = req.body;

  if (authors.filter((a) => a === name.trim()).length > 0) {
    req.session.success = true;
    res.redirect("/");

    return;
  }

  req.session.success = false;
  res.redirect("/search");
});

app.listen(port, () => {
  console.log(`Server app listening at http://${hostname}:${port}`);
});
