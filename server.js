const express = require("express");
const morgan = require("morgan");
const blogRouter = require("./routes/blogRouter");

const db =
  "mongodb+srv://blog_data:test123@nodejs.hbkdn.mongodb.net/Blogs?retryWrites=true&w=majority";
// express app
const app = express();

const mongoose = require("mongoose");
const Blog = require("./models/blogs");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(8080, () => console.log("App listing on 8080"));
    console.log("Connected to db...");
  })
  .catch((err) => console.log(err));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
// register view engine
app.set("view engine", "ejs");
app.set("views", "public");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/all-blogs", async (req, res) => {
  const allBlogs = await Blog.find();
  res.send(allBlogs);
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use(blogRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
