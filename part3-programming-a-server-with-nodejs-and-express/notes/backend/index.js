require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
mongoose.connect(url);

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => console.log(error));
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })

    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
