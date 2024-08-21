const validator = require('validator')
const bcrypt = require('bcrypt')

const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/',async(request,response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/',async(request,response) => {
  const { username, name, password } = request.body

  if(!password || password.length < 8){
    response.status(400).json({ error: 'Please provide a password of at least 8 characters long' })
  }

  if(!validator.isStrongPassword(password, { minSymbols:0 })){
    response.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter