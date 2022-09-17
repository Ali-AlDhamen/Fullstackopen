import ShowCountry from "./ShowCountry";

const ShowCountries = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <ShowCountry country={countries[0]} />;
  } else {
    return (
      <div>
        {countries.map((country) => {
          return (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={() => setCountries([country])}>show</button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ShowCountries;
