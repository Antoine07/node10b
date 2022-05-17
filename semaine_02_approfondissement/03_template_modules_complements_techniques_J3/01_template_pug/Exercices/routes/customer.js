import express from "express";
import authors from "./../Data/authors.js";
import posts from "./../Data/posts.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("posts/home", {
    posts: posts.filter((p) => p.priority === "important"),
    authors,
  });
});

router.get("/posts", (req, res) => {
  res.render("posts/index", { posts, authors });
});

router.get("/search", (req, res) => {
  res.render("authors/search", { authors });
});

router.post("/search", (req, res) => {
  const { name } = req.body;

  if (authors.filter((a) => a === name.trim()).length > 0) {
    req.flash("success_message", {
      type: "success",
      content: `L'auteur ${name} existe.`,
    });

    res.redirect("/");

    return;
  }

  req.flash("success_message", {
    type: "danger",
    content: `L'auteur ${name} n'existe pas.`,
  });

  res.redirect("/search");
});

router.get("/customer", (req, res) => {});

export default router;
