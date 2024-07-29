const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: "No title and/or URL provided" });
  }

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
