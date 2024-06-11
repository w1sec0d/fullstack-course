import React from "react";

const Country = ({ value }) => {
  return (
    <div>
      <h1>{value.name.common ? value.name.common : "Country name"}</h1>
      <p>
        <span style={{ fontWeight: "bold" }}>Capital:</span> {value.capital}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Area:</span> {value.area}
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(value.languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img src={value.flags.svg} style={{ maxWidth: "200px" }} />
    </div>
  );
};

export default Country;
