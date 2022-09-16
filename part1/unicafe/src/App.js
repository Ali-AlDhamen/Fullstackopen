import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <th>{value}</th>
  </tr>
);
const Statistics = ({ Feedbacks, others }) => {
  const [total, average, positive] = others;
  if (total === 0) {
    return <div>no feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={Feedbacks.good} />
        <StatisticLine text="Neutral" value={Feedbacks.neutral} />
        <StatisticLine text="Bad" value={Feedbacks.bad} />
        <StatisticLine text="Total Feedback" value={total} />
        <StatisticLine text="average" value={`${average}%`} />
        <StatisticLine text="positive" value={`${positive}%`} />
      </tbody>
    </table>
  );
};
const App = () => {
  const [Feedbacks, setFeedbacks] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  const handleGood = () => {
    setFeedbacks({
      ...Feedbacks,
      good: Feedbacks.good + 1,
    });
  };
  const handleBad = () => {
    setFeedbacks({
      ...Feedbacks,
      bad: Feedbacks.bad + 1,
    });
  };
  const handleNeutral = () => {
    setFeedbacks({
      ...Feedbacks,
      neutral: Feedbacks.neutral + 1,
    });
  };

  let total = 0;

  for (const value of Object.values(Feedbacks)) {
    total += value;
  }
  let average = (((Feedbacks.good - Feedbacks.bad) / total) * 100).toFixed(2);
  let positive = ((Feedbacks.good / total) * 100).toFixed(2);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleBad} text="Bad" />
      <Button onClick={handleNeutral} text="Neutral" />
      <h2>Statistics</h2>
      <Statistics Feedbacks={Feedbacks} others={[total, average, positive]} />
    </div>
  );
};

export default App;
