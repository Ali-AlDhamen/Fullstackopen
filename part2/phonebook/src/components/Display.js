const Display = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <p className="info" key={person.id}>
          {person.name}, {person.number}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Display;
