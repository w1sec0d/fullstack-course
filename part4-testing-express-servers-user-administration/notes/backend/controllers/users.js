const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const validator = require('validator')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // Validate raw password
  if (!password || password.length < 8) {
    return response.status(400).json({ error: 'Password must be at least 8 characters long' })
  }

  if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    return response.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter