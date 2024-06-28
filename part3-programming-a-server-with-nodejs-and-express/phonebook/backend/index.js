// .env variables
require("dotenv").config();
const PORT = process.env.port || 3001;
const URL = process.env.MONGODB_URL;
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

// MongoDB Connection
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((error) => next(error));

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
    .catch((error) => next(error));
});

// Get routes
app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
  );
});

// Delete routes
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        response.status(400).json({ error: "Bad ID provided" });
      } else {
        response.status(200).json({ message: "User deleted successfully!" });
      }
    })
    .catch((error) => next(error));
});

// Patch routes
app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  if (request.body.name && request.body.phone) {
    Person.findByIdAndUpdate(
      id,
      {
        name: request.body.name,
        phone: request.body.phone,
      },
      { new: true }
    )
      .then((res) => response.status(200).json(res))
      .catch((error) => next(error));
  } else {
    response.status(404).json({ error: "Incomplete person info" });
  }
});

// Test error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
