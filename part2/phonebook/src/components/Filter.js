const Filter = ({ onChange, value }) => {
  return (
    <div>
      Search with name <input onChange={onChange} value={value} />
    </div>
  );
};

export default Filter;
