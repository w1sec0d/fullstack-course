const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

// Create a route to get number of blogs from each user
blogRouter.get('/blogsPerUser', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title:1,author:1,url:1,likes:1 })
  const blogsPerUser = []
  users.forEach((user) => {
    blogsPerUser.push(
      {
        userId: user.id,
        name: user.name,
        blogs: user.blogs
      }
    )
  })
  return response.json(blogsPerUser)
})

// Create a route to get number of blogs from each user
blogRouter.get('/blogsPerUser/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', { title:1,author:1,url:1,likes:1 })
  return response.json(user.blogs)
})


blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  return response.json(blog)
})


blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'No token authorization given!' })
  }

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user._id,
  })

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'No title and/or URL provided' })
  }

  const result = await blog.save()
  request.user.blogs = request.user.blogs.concat(blog)
  await request.user.save()

  return response.status(201).json(result)
})

// Create a route to add comments to a blog
blogRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'No token authorization given!' })
  }

  const blogId = request.params.id
  const body = request.body

  const commentRequest = await Blog.findByIdAndUpdate(blogId, { $push: { comments: body.comment } }, { new: true })

  return response.status(201).json(commentRequest)
})


blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blogToDelete = await Blog.findById(request.params.id)

    if (decodedToken.id === blogToDelete.user.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    } else {
      return response
        .status(401)
        .json({ error: 'Only post creator can delete this post' })
    }
  }
)

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'No token authorization given!' })
  }

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  })
  return response.status(201).json(updatedBlog)
})

module.exports = blogRouter
