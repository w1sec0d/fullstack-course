import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState({ all: null, filtered: [] });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all/")
      .then((response) => setCountries({ all: response.data, filtered: [] }))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setCountries((prevState) => ({
      ...prevState,
      filtered:
        prevState.all && filter
          ? prevState.all.filter((country) =>
              country.name.common.toLowerCase().startsWith(filter.toLowerCase())
            )
          : [],
    }));
  }, [filter]);

  const showCountry = (countryName) => {
    const selectedCountry = countries.filtered.filter(
      (country) => country.name.official === countryName
    );
    setCountries({ ...countries, filtered: selectedCountry });
  };

  return (
    <div>
      <h1>Countries App</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="country">
          Type a country name to search its info
          <input
            type="text"
            placeholder="Colombia"
            id="country"
            onChange={(event) => setFilter(event.target.value)}
          />
        </label>
        {countries.filtered.length > 10 && <p>Too many countries in search</p>}
        {countries.filtered.length <= 10 &&
          countries.filtered.length >= 2 &&
          countries.filtered.map((country) => {
            return (
              <p key={country.name.official}>
                {country.name.common}
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => showCountry(country.name.official)}
                >
                  Show Country
                </button>
              </p>
            );
          })}
        {countries.filtered.length === 1 && (
          <Country value={countries.filtered[0]} />
        )}
      </form>
    </div>
  );
};

export default App;
