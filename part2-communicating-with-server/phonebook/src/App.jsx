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
      const contactToUpdate = people.find((obj) => obj.name == newName);

      if (contactToUpdate.phone === newPhone) {
        window.alert(
          "The contact is already registered with that phone number!"
        );
      } else if (
        window.confirm(
          `${newName} is already added on the notebook! Do you want to update its info?`
        )
      ) {
        try {
          let response = await PhonebookService.update(contactToUpdate.id, {
            name: newName,
            phone: newPhone,
          }).then((res) =>
            setPeople((previousPeople) =>
              previousPeople.filter((person) => person.id != res.id).concat(res)
            )
          );
          setNewName("");
          setNewPhone("");
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      try {
        let response = await PhonebookService.create({
          name: newName,
          phone: newPhone,
        });
        setPeople((previousPeople) => previousPeople.concat(response));
        setNewName("");
        setNewPhone("");
      } catch (error) {
        console.error(error);
      }
    }
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
