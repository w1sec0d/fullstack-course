const { test, after, assert } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  // is the argument truthy
  assert(contents.includes('HTML is easy'))
})

after(async () => {
  await mongoose.connection.close()
})