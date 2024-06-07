import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((obj) => obj.name == newName)) {
      window.alert(`${newName} is already added on the notebook!`);
    } else {
      setPersons(persons.concat({ name: newName, phone: newPhone }));
    }
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a New Contact</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />
      <h2>Numbers</h2>
      <People filteredPeople={filteredPeople} />
    </div>
  );
};

export default App;
