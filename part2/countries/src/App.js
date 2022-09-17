import { useEffect, useState } from "react";
import axios from "axios";
import ShowCountries from "./components/ShowCountries";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const regex = new RegExp(filter, "i");
    const filteredCountries = () =>
      allCountries.filter((country) => country.name.common.match(regex));
    setCountries(filteredCountries);
  };

  return (
    <div className="App">
      <div>
        find countries <input onChange={handleFilterChange} value={filter} />
      </div>
      <ShowCountries countries={countries} setCountries={setCountries} />
    </div>
  );
};

export default App;
