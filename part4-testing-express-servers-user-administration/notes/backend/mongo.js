const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
