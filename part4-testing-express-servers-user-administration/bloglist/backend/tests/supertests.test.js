const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  // Resets BD documents
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('When there is initially some blogs saved', () => {
  describe('A GET request', () => {
    test('Is responded with blogs in JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('Is responded with the correct amount of blogs', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('Blog Schema',() => {
    test('Returns id field instead of _id', async () => {
      const response = await api.get('/api/blogs')
      const idField = response.body.reduce((prev, blog) => {
        if (!prev) {
          return false
        } else {
          return blog.id !== undefined
        }
      })
      assert.strictEqual(idField, true)
    })
  })

  describe('A POST request',() => {
    test('Can save a blog successfully', async () => {
      const newBlog = new Blog({
        title: 'Programming it\'s the hardest thing to do',
        author: 'And that\'s awesome',
        url: 'asdasddsad',
        likes: 20,
      })

      await newBlog.save()
      const response = await api.get('/api/blogs')
      const savedBlog = response.body.find(
        (blog) => blog.title === 'Programming it\'s the hardest thing to do'
      )

      assert.strictEqual(
        helper.shallowEqualityCheck(savedBlog, {
          title: 'Programming it\'s the hardest thing to do',
          author: 'And that\'s awesome',
          url: 'asdasddsad',
          likes: 20,
          id: newBlog.id,
        }),
        true
      )
    })
    test('Allows a saved blog with undefined likes start with 0 by default', async () => {
      const newBlog = new Blog({
        title: 'Programming it\'s the hardest thing to do',
        author: 'And that\'s awesome',
        url: 'asdasddsad',
      })
      await newBlog.save()

      assert.strictEqual(newBlog.likes, 0)
    })
    test('Gives proper response if title is missing when creating a blog', async () => {
      const newBlog = new Blog({
        author: 'And that\'s awesome',
        url: 'asdasddsad',
      })
      await api.post('/api/blogs').send(newBlog).expect(400)
    })
  })

  describe('A DELETE request',() => {
    test('Can delete a post',async () => {
      const newBlog = new Blog({
        title: 'This post should be deleted soon',
        author: 'And that\'s awesome',
        url: 'asdasddsad',
        likes:0,
      })
      await newBlog.save()
      await api.delete(`/api/blogs/${newBlog.id}`).expect(204)

      const BlogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length)

      const titles = BlogsAtEnd.map((blog) => blog.title)
      assert(!titles.includes(newBlog.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
