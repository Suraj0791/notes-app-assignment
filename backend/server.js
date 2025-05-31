const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());

// In-memory store for notes
let notes = [];
let nextId = 1;


app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST /notes - add a new note
app.post("/notes", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const newNote = {
    id: nextId++,
    text,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE /notes/:id - delete a note
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  if (notes.length === initialLength) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
