import { useEffect, useState } from "react";
import axios from "axios";

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=26d5dfea82d1ecd41735ea46675a4328&query=${country.capital[0]}`
      )
      .then((response) => {
        const apiResponse = response.data;
        setWeather(apiResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  let languages = country.languages;
  const countryLanguages = [];
  Object.keys(languages).forEach((key) => {
    countryLanguages.push(languages[key]);
  });
  const newLang = [...new Set(countryLanguages)];
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <br />
      <h4>languages: </h4>
      <ul>
        {newLang.map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <div>
        <img src={country.flags.png} alt="flag pic" />
      </div>
      <div>
        <h3>Weather in {weather.location.name}</h3>
        <p>temperature is {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} alt="weather icon" />
        <p>wind {weather.current.wind_speed}m/s</p>
      </div>
    </div>
  );
};

export default ShowCountry;
