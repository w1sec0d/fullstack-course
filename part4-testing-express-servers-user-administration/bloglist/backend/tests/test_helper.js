const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Nodemon App',
    author: 'carl',
    url: 'dsad',
    likes: 2,
  },
  {
    title: 'The Perfect Eslint Config',
    author: 'carl',
    url: 'asdasddsad',
    likes: 20,
  },
]

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: 'Will be deleted soon',
    author: 'carl',
    url: 'asdasddsad',
    likes: 20,
  })
  newBlog.save()
  newBlog.deleteOne()
  return newBlog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

function shallowEqualityCheck(obj1, obj2) {
  // function from https://sentry.io/answers/how-do-i-check-if-an-array-includes-a-value-in-javascript/
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }
  return true
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  shallowEqualityCheck,
}
