const People = ({ filteredPeople }) => {
  return filteredPeople.map((person) => (
    <p key={person.name}>
      {person.name} {person.phone}
    </p>
  ));
};

export default People;
