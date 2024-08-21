require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')

console.log('Connecting to:', MONGODB_URI)
mongoose.connect(MONGODB_URI).then(() => console.log('Connected to mongoDB'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app
