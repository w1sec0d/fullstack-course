const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Filter shown with
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;
