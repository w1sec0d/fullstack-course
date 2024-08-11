const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true, // this ensures the uniqueness of username
    minlength: [3, 'Username must be at least 3 characters long'],
    validate: {
      validator: function(v) {
        return validator.isAlphanumeric(v)
      },
      message: props => `${props.value} is not a valid username! Only letters and numbers are allowed.`
    }
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User