// .env variables
require("dotenv").config();
// Express
const express = require("express");
const app = express();
// Morgan logger
let morgan = require("morgan");
app.use(express.json());
// CORS
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors());
// DB Models
const Person = require("./models/person");

// Frontend View
app.use(express.static("dist"));

// Configures morgan logger
morgan.token("requestBody", (request) => JSON.stringify(request.body));
app.use(morgan(" :method :url :response-time :requestBody"));

const PORT = process.env.port || 3001;
const URL = process.env.MONGODB_URL;

// MongoDB Connection
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((error) => console.log("Something went wrong. Error:", error));

// Post routes
app.post("/api/persons", (request, response) => {
  if (!request.body.name || !request.body.phone) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: request.body.name,
    phone: request.body.phone,
  });
  console.log(person);

  person
    .save()
    .then((newPerson) => response.status(201).json(newPerson))
    .catch((error) => response.status(400).json({ error: error.message }));
});

// Get routes
app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch(() => response.status(404).end());
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const requestedPerson = persons.find((person) => person.id === id);
  if (requestedPerson) {
    response.json(requestedPerson);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
  );
});

// Delete routes

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  let initialLength = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length < initialLength) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
