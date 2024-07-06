const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cramirezmun:${password}@cluster0.uzxsbhd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  let name = process.argv[3]
  let phone = process.argv[4]

  const person = new Person({
    name,
    phone,
  })

  person.save().then(() => {
    console.log(`Added ${name} number ${phone} to the phonebook!`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((person) => console.log(`${person.name} ${person.phone}`))
    mongoose.connection.close()
  })
}
