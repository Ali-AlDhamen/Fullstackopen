import { useState, useEffect } from "react";
import axios from "axios";
import Text from "./components/Text";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/phoneBook").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setPeople(response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    for (const person of people) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName}, already added to phone book`);
        return;
      }
    }
    setPersons(persons.concat(personObject));
    setPeople(people.concat(personObject));
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const regex = new RegExp(filter, "i");
    const filteredPersons = () =>
      people.filter((person) => person.name.match(regex));
    setPersons(filteredPersons);
  };
  return (
    <div>
      <Text text={"PhoneBook"} />
      <Filter onChange={handleFilterChange} value={filter} />
      <Text text={"add a new person"} />
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        onSubmit={addPerson}
      />
      <Text text={"Numbers"} />
      <div>
        {persons.map((person, i) => (
          <p key={person.name}>
            {person.name}, {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
