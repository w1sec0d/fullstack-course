const People = ({ filteredPeople, onDelete }) => {
  return filteredPeople.map((person) => (
    <p key={person.id ? person.id : person.name}>
      {person.name} {person.phone}
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </p>
  ));
};

export default People;
