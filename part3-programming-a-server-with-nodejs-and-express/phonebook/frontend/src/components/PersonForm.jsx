import { useState, useCallback } from 'react';
import PhonebookService from '../services/phonebook';

const PersonForm = ({ setNotificationMessage, people, setPeople }) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (people.some((obj) => obj.name == newName)) {
        const contactToUpdate = people.find((obj) => obj.name == newName);

        if (contactToUpdate.phone === newPhone) {
          window.alert(
            'The contact is already registered with that phone number!'
          );
        } else if (
          window.confirm(
            `${newName} is already added on the notebook! Do you want to update its info?`
          )
        ) {
          await PhonebookService.update(contactToUpdate.id, {
            name: newName,
            phone: newPhone,
          })
            .then((res) =>
              setPeople((previousPeople) => {
                setNewName('');
                setNewPhone('');
                return previousPeople
                  .filter((person) => person.id != res.id)
                  .concat(res);
              })
            )
            .catch((error) => {
              setNotificationMessage({
                value: `The contact ${newName} has already been removed from the server. Please reload the page`,
                type: 'error',
              });
              setTimeout(() => {
                setNotificationMessage(null);
              }, 3000);
              console.error(error);
            });
        }
      } else {
        await PhonebookService.create({
          name: newName,
          phone: newPhone,
        })
          .then((response) => {
            setPeople((previousPeople) => previousPeople.concat(response));
            setNewName('');
            setNewPhone('');
            setNotificationMessage({
              value: `Added contact ${response.name}`,
              type: 'success',
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setNotificationMessage({
              value: error.response.data.error,
              type: 'error',
            });
            console.log('errorrrr', error.response.data);
          });
      }
    },
    [newPhone, newName, people, setNotificationMessage, setPeople]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newPhone}
          onChange={(event) => setNewPhone(event.target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
