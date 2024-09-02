const validator = require('validator')
const bcrypt = require('bcrypt')

const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/',async(request,response) => {
  const users = await User.find({}).populate('blogs',{ id:1,url:1,title:1,author:1 })
  response.json(users)
})

userRouter.post('/',async(request,response) => {
  const { username, name, password } = request.body

  // USERNAME VALIDATION
  if(!username || username.length < 3){
    response.status(400).json({ error: 'Please provide a username of at least 3 characters long' })
  }

  if(User.find({ username })){
    response.status(400).json({ error: `Please provide a unique username. "${username}" is already taken` })
  }

  // PASSWORD VALIDATION
  if(!password || password.length < 3){
    response.status(400).json({ error: 'Please provide a password of at least 3 characters long' })
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