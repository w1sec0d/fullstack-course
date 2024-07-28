const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const supertest = require("supertest");
const app = require("../app");
const { default: mongoose } = require("mongoose");

const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const { log } = require("node:console");

beforeEach(async () => {
  // Resets BD documents
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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
});

after(async () => {
  await mongoose.connection.close();
});
