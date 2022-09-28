import { useState, useEffect } from "react";
import Text from "./components/Text";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import phoneBookService from "./services/phoneBookService";
import axios from "axios";
import "./index.css";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [updatePerson, setUpdatePerson] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phoneBookService.getAll().then((initialPerson) => {
      setPeople(initialPerson);
      setPersons(initialPerson);
    });
  }, [updatePerson]);

  const addPerson = (event) => {
    let add = false;
    let found = false;
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    for (const person of people) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        found = true;
        if (
          window.confirm(
            `${person.name} is already added to phoneBook, replace the old number with new one?`
          )
        ) {
          phoneBookService
            .update(person.id, personObject)
            .then((returnedPerson) => {
              setUpdatePerson(returnedPerson);
              setPeople(
                people.map((person1) =>
                  person1.id !== person.id ? person : updatePerson
                )
              );

              setNewName("");
              setNewNumber("");
            })

            .catch((error) => {
              setErrorMessage(
                `'${newName}' information was already removed from server`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
              setPeople(people.filter((n) => n.id !== person.id));

              setNewName("");
              setNewNumber("");
            });

          setErrorMessage(`Updated ${newName} information in phoneBook`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          return;
        }
      }
    }

    if (add || !found) {
      phoneBookService.create(personObject).then((returnedPerson) => {
        setErrorMessage(`added ${newName} to phoneBook`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setPeople(people.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const deletePerson = (id) => {
    const person = people.find((n) => n.id === id);
    if (
      window.confirm(`are you sure to remove ${person.name} from phoneBook?`)
    ) {
      try {
        axios.delete(`${"http://localhost:3001/phoneBook"}/${id}`);
        console.log("Item successfully deleted.");
        setPeople(people.filter((n) => n.id !== person.id));
        setPersons(people.filter((n) => n.id !== person.id));
      } catch (error) {
        alert(error);
      }
    }
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
      <Notification message={errorMessage} />
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
      <Display persons={persons} deletePerson={deletePerson} />
      <Footer />
    </div>
  );
};

export default App;
