import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const CurrentAnecdotes = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <br />
      has {votes} votes
    </div>
  );
};

const HighestVote = ({ anecdotes, anecdotesArray }) => {
  const highest = Math.max(...anecdotesArray);
  const index = anecdotesArray.indexOf(highest);
  const topAnecdotes = anecdotes[index];

  console.log(highest, index, topAnecdotes);
  if (highest === 0) {
    return <div>there`s not votes yet!</div>;
  }
  return (
    <div>
      <p>{topAnecdotes}</p>
      <p>has {highest} votes</p>
    </div>
  );
};

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);
  const [anecdotesArray, setAnecdotesArray] = useState(
    Array(anecdotes.length).fill(0)
  );
  const RandomNumber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const UpdateArray = () => {
    const newArray = [...anecdotesArray];
    newArray[selected] += 1;
    setAnecdotesArray(newArray);
  };
  return (
    <div>
      <Header text="Vote for your favorite anecdote" />
      <CurrentAnecdotes
        anecdote={anecdotes[selected]}
        votes={anecdotesArray[selected]}
      />
      <Button onClick={UpdateArray} text="vote" />
      <Button onClick={RandomNumber} text="next anecdote" />
      <Header text="Anecdote with most votes " />
      <HighestVote anecdotes={anecdotes} anecdotesArray={anecdotesArray} />
    </div>
  );
};

export default App;
