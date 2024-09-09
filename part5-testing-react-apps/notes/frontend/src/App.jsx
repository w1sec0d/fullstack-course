import { useState, useEffect } from "react";

import noteService from "./services/notes";
import loginService from "./services/login";

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

const App = () => {
  console.log("render");

  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const createNote = (note) => {
    noteService
      .create(note)
      .then((note) => setNotes((oldNotes) => oldNotes.concat(note)));
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleSignOut = async () => {
    try {
      window.localStorage.removeItem("loggedNoteappUser");
      setUser(null);
    } catch (error) {
      console.error("There was an error signing out");
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1 style={{ color: "darkgreen", fontStyle: "italic" }}>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={createNote} />
          </Togglable>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
