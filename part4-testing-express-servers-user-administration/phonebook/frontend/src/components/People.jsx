const People = ({ filteredPeople, onDelete }) => {
  return filteredPeople.map((person) => (
    <p key={person.id ? person.id : person.name}>
      {person.name}{' '}
      <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
        {person.phone}
      </span>
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </p>
  ));
};

export default People;
