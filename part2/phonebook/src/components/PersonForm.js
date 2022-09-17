const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
  onSubmit,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default PersonForm;
