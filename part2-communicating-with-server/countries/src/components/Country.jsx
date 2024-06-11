import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Country = ({ value }) => {
  const OPEN_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY;
  const capitalCoords = value.capitalInfo.latlng;
  const [weather, setWeater] = useState(null);

  const getWeather = useCallback(
    (lat, lon) => {
      return axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
        .then((res) => setWeater(res.data));
    },
    [OPEN_WEATHER_API_KEY]
  );

  useEffect(() => {
    getWeather(capitalCoords[0], capitalCoords[1]);
  }, [getWeather, capitalCoords]);

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
      {weather && (
        <>
          <h2>Weather In {value.capital}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`Icon of weather: ${weather.weather[0].description}`}
            title={weather.weather[0].description}
          />
          <p>Wind:{weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;
