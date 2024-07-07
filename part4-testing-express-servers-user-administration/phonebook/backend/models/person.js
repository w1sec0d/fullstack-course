const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const URL = process.env.MONGODB_URL

// MongoDB Connection
mongoose
  .connect(URL)
  .then(() => console.log('MongoDB Connected!'))
  .catch((error) => console.log('Something went wrong. Error:', error))

function phoneValidator(phone) {
  return /^\d{2,3}-\d+$/.test(phone)
}

const personSchema = mongoose.Schema({
  id: String,
  name: {
    type: String,
    minLength: [3, 'The person\'s name has to be at least 3 characters long'],
    required: [true, 'Name required'],
  },
  phone: {
    type: String,
    validate: {
      validator: phoneValidator,
      message: (props) => `${props.value} is an invalid number`,
    },
    required: [true, 'Phone required'],
    minLength: [8, 'Phone numbers have to be at least 8 numbers long'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
