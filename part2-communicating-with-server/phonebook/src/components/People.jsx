const People = ({ filteredPeople }) => {
  return filteredPeople.map((person) => (
    <p key={person.id ? person.id : person.name}>
      {person.name} {person.phone}
    </p>
  ));
};

export default People;
