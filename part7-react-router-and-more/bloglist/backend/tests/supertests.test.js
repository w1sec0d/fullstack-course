const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const jwt = require('jsonwebtoken')

const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  // Resets BD documents
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
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

  describe('Blog Schema', () => {
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

  describe('A POST request', () => {
    test('Can save a blog successfully', async () => {
      const user = new User({
        username: 'wisecod',
        name: 'carl',
        passwordHash: 'Cisco123',
      })
      await user.save()

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET
      )

      const newBlog = {
        title: 'Programming its the hardest thing to do',
        author: 'And thats awesome',
        url: 'asdasddsad',
        likes: 20,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const savedBlog = response.body.find(
        (blog) => blog.title === 'Programming its the hardest thing to do'
      )

      assert.strictEqual(
        helper.shallowEqualityCheck(savedBlog, {
          title: 'Programming it\'s the hardest thing to do',
          author: 'And thats awesome',
          url: 'asdasddsad',
          likes: 20,
          id: savedBlog.id,
          user: savedBlog.user,
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
      const user = new User({
        username: 'wisecod',
        name: 'carl',
        passwordHash: 'Cisco123',
      })
      await user.save()

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET
      )

      const newBlog = new Blog({
        author: 'And that\'s awesome',
        url: 'asdasddsad',
      })
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
  })

  describe('A DELETE request', () => {
    test('Can delete a post', async () => {
      const user = new User({
        username: 'wisecod',
        name: 'carl',
        passwordHash: 'Cisco123',
      })
      await user.save()

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET
      )

      const newBlog = new Blog({
        title: 'This post should be deleted soon',
        author: 'And that\'s awesome',
        url: 'asdasddsad',
        likes: 0,
        user: user,
      })
      await newBlog.save()

      await api
        .delete(`/api/blogs/${newBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const BlogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length)

      const titles = BlogsAtEnd.map((blog) => blog.title)
      assert(!titles.includes(newBlog.title))
    })
  })

  describe('A PUT request', () => {
    test('Can update a blog', async () => {
      const initialBlogs = await helper.blogsInDB()
      const blogIdToUpdate = initialBlogs[0].id
      await api.put(`/api/blogs/${blogIdToUpdate}`).send({
        title: 'updated text',
        author: 'updated text',
        url: 'updated text',
        likes: 123,
      })

      const response = await api.get(`/api/blogs/${blogIdToUpdate}`)
      const updatedBlog = response.body

      assert.deepStrictEqual(updatedBlog, {
        title: 'updated text',
        author: 'updated text',
        url: 'updated text',
        likes: 123,
        id: updatedBlog.id,
      })
    })
  })
})

describe('When saving new users', () => {
  test('No provided password returns a 400 error', async () => {
    const initialUsers = await helper.usersInDB()

    const noPassUser = {
      username: 'codewi',
      name: 'Carl',
    }
    await api.post('/api/users').send(noPassUser).expect(400)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(initialUsers.length, usersAtEnd.length)
  })
  test('No provided username returns a 400 error', async () => {
    const initialUsers = await helper.usersInDB()

    const noUsernameUser = {
      password: 'cisco123',
      name: 'Carl',
    }
    await api.post('/api/users').send(noUsernameUser).expect(400)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(initialUsers.length, usersAtEnd.length)
  })
  test('Short password returns a 400 error', async () => {
    const initialUsers = await helper.usersInDB()

    const shortPassUser = {
      username: 'codewi',
      password: '12',
      name: 'Carl',
    }
    await api.post('/api/users').send(shortPassUser).expect(400)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(initialUsers.length, usersAtEnd.length)
  })
  test('Short username returns a 400 error', async () => {
    const initialUsers = await helper.usersInDB()

    const shortUsernameUser = {
      username: 'co',
      password: 'cisco123',
      name: 'Carl',
    }
    await api.post('/api/users').send(shortUsernameUser).expect(400)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(initialUsers.length, usersAtEnd.length)
  })
  test('Not Unique username returns a 400 error', async () => {
    const existingUser = new User({
      username: 'carl',
      name: 'carlito',
      passwordHash: 'hey1',
    })
    await existingUser.save()

    const initialUsers = await helper.usersInDB()

    const notUniqueUsernameUser = {
      username: 'carl',
      password: 'cisco123s',
      name: 'Carls',
    }
    await api.post('/api/users').send(notUniqueUsernameUser).expect(400)

    const usersAtEnd = await helper.usersInDB()

    assert.strictEqual(initialUsers.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
