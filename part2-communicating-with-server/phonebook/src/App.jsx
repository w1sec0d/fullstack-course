import { useState, useEffect } from "react";
import PhonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  // Event handlers, delete and submit

  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure to delete the contact?")) {
      try {
        await PhonebookService.deleteContact(contactId).then((res) =>
          setPeople((previousPeople) =>
            previousPeople.filter((person) => person.id != res.id)
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (people.some((obj) => obj.name == newName)) {
      window.alert(`${newName} is already added on the notebook!`);
    } else {
      let response = await PhonebookService.create({
        name: newName,
        phone: newPhone,
      });

      if (response) {
        setPeople((previousPeople) => previousPeople.concat(response));
      }
    }
    setNewName("");
    setNewPhone("");
  };

  useEffect(() => {
    PhonebookService.getAll().then((res) => setPeople(res));
    console.log("get all!");
  }, []);

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

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
      <People filteredPeople={filteredPeople} onDelete={handleDelete} />
    </div>
  );
};

export default App;
