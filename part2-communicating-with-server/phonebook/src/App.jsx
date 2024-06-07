import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (persons.some((obj) => obj.name == newName)) {
            window.alert(`${newName} is already added on the notebook!`);
          } else {
            setPersons(persons.concat({ name: newName, phone: newPhone }));
          }
          setNewName("");
          setNewPhone("");
        }}
      >
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newPhone}
            onChange={(event) => setNewPhone(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
