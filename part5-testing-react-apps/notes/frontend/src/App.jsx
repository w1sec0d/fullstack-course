import { useState, useEffect } from "react";

import noteService from "./services/notes";
import loginService from "./services/login";

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const LoginForm = ({
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        id="Username"
        onChange={({ target }) => setUsername(target.value)}
        autoComplete="username"
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
        autoComplete="current-password"
      />
    </div>
    <button type="submit">login</button>
  </form>
);

const NoteForm = ({ addNote, newNote, handleNoteChange }) => (
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={handleNoteChange}
      id="noteText"
      name="noteText"
    />
    <button type="submit">save</button>
  </form>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
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

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
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
      <Notification message={errorMessage} />

      <h2>Login</h2>

      {user === null ? (
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <NoteForm
            newNote={newNote}
            addNote={addNote}
            handleNoteChange={handleNoteChange}
          />
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
