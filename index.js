import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

let posts = [
  {
    id: "1",
    title: "Welcome to E-Blogs",
    content: "This is a sample article showcasing the new horizontal layout.",
    date: new Date().toLocaleDateString(),
  },
];

// Views and Static Config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => res.render("index.ejs", { posts }));
app.get("/create", (req, res) => res.render("create.ejs"));
app.get("/blogs", (req, res) => res.render("blogs.ejs", { posts }));
app.get("/about", (req, res) => res.render("about.ejs"));

app.post("/posts", (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    date: new Date().toLocaleDateString(),
  };
  posts.push(newPost);
  res.redirect("/blogs");
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("edit.ejs", { post });
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/blogs");
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/blogs");
});

app.listen(port, () => console.log(`Server on http://localhost:${port}`));

export default app;
