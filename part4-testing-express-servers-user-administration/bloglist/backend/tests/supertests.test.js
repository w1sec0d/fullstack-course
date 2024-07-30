const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const supertest = require("supertest");
const app = require("../app");
const { default: mongoose } = require("mongoose");

const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  // Resets BD documents
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("MongoDB Tests", () => {
  test("Get returns blogs in json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Get returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("Blog Schema returns id field instead of _id", async () => {
    const response = await api.get("/api/blogs");
    const idField = response.body.reduce((prev, blog) => {
      if (!prev) {
        return false;
      } else {
        return blog.id !== undefined;
      }
    });
    assert.strictEqual(idField, true);
  });

  test("A blog can be saved successfully", async () => {
    const newBlog = new Blog({
      title: "Programming it's the hardest thing to do",
      author: "And that's awesome",
      url: "asdasddsad",
      likes: 20,
    });

    await newBlog.save();
    const response = await api.get("/api/blogs");
    const savedBlog = response.body.find(
      (blog) => blog.title === "Programming it's the hardest thing to do"
    );

    assert.strictEqual(
      helper.shallowEqualityCheck(savedBlog, {
        title: "Programming it's the hardest thing to do",
        author: "And that's awesome",
        url: "asdasddsad",
        likes: 20,
        id: newBlog.id,
      }),
      true
    );
  });

  test("A saved blog with undefined likes starts with 0 by default", async () => {
    const newBlog = new Blog({
      title: "Programming it's the hardest thing to do",
      author: "And that's awesome",
      url: "asdasddsad",
    });
    await newBlog.save();

    assert.strictEqual(newBlog.likes, 0);
  });

  test("Proper response if title is missing when creating a blog", async () => {
    const newBlog = new Blog({
      author: "And that's awesome",
      url: "asdasddsad",
    });
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
