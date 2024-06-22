import { useState, useEffect, useCallback } from "react";
import PhonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Notification from "./components/Notification";

import "./index.css";

const App = () => {
  console.log("render");
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState("");

  const fetchContacts = useCallback(() => {
    PhonebookService.getAll()
      .then((res) => {
        console.log(res);
        return setPeople(res);
      })
      .catch((error) => {
        window.alert("An error occurred fetching users. Please try again");
        console.error(error);
      });
  }, []);

  // Event handlers, delete and submit

  const handleDelete = useCallback(
    async (contactId) => {
      if (window.confirm("Are you sure to delete the contact?")) {
        await PhonebookService.deleteContact(contactId)
          .then((res) => {
            setPeople((previousPeople) =>
              previousPeople.filter((person) => person.id !== res.id)
            );
            fetchContacts();
          })
          .catch((error) => {
            window.alert(
              "An error occurred deleting the user. Please try again"
            );
            console.log(error);
          });
      }
    },
    [fetchContacts]
  );

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredPeople = people
    ? people.filter((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : [];
  console.log(people);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        className={notificationClass}
      />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a New Contact</h2>
      <PersonForm
        setNotificationMessage={setNotificationMessage}
        setNotificationClass={setNotificationClass}
        people={people}
        setPeople={setPeople}
      />
      <h2>Numbers</h2>
      <People filteredPeople={filteredPeople} onDelete={handleDelete} />
    </div>
  );
};

export default App;
