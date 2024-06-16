const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Post routes
app.post("/api/persons", (request, response) => {
  let person = request.body;
  if (person.name && person.number) {
    // Ensures a unique id
    let newId = Math.random();
    while (persons.find((person) => person.id === newId)) {
      newId = Math.random();
    }

    // Adds the new person
    const newPerson = { id: newId, name: person.name, number: person.number };
    persons = persons.concat(newPerson);

    response.status(201).json(newPerson);
  } else {
    response.status(400).end();
  }
});

// Get routes
app.get("/api/persons", (request, response) => {
  response.json(persons);
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
