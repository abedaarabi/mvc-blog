const express = require("express");
const router = express.Router();

const Blog = require("../models/blogs");

router.get("/blogs/create", async (req, res) => {
  try {
    await res.render("create", { title: "Create a new blog" });
    console.log("******* here");
  } catch (error) {
    console.log(error);
  }
});
router.get("/blogs/:id", async (req, res) => {
  try {
    const result = await Blog.findById(req.params.id);
    res.render("detalis", { blog: result, title: "blog Id" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const result = await Blog.find().sort({ createdAt: -1 });
    res.render("index", { title: "All blogs", blogs: result });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id).then((result) => {
      res.json({ redirect: "/blogs" });
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/blogs", async (req, res) => {
  try {
    await new Blog(req.body).save();
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
