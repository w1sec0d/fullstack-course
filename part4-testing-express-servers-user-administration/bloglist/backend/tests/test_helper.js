const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Nodemon App",
    author: "carl",
    url: "dsad",
    likes: 2,
  },
  {
    title: "The Perfect Eslint Config",
    author: "carl",
    url: "asdasddsad",
    likes: 20,
  },
];

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: "Will be deleted soon",
    author: "carl",
    url: "asdasddsad",
    likes: 20,
  });
  newBlog.save();
  newBlog.deleteOne();
  return newBlog._id.toString();
};

const blogsInDB = async () => {
  const blogs = Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, nonExistingId, blogsInDB };
