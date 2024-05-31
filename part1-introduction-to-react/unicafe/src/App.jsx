import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  const averageFeedback = (good, bad, total) => (good - bad) / total;

  const positiveFeedBack = (good, total) => (good / total) * 100;

  return (
    <div>
      {total === 0 && <p>No feedback given</p>}
      {total >= 0 && (
        <>
          <h1>Statistics</h1>
          <p>Good {good}</p>
          <p>Neutral {neutral}</p>
          <p>Bad {bad}</p>
          <p>All {good + neutral + bad}</p>
          <p>Average {averageFeedback(good, bad, total).toFixed(2)}</p>
          <p>Positive {positiveFeedBack(good, total).toFixed(2)} %</p>
        </>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={() => setGood((prevValue) => prevValue + 1)}>
          Good
        </button>
        <button onClick={() => setNeutral((prevValue) => prevValue + 1)}>
          Neutral
        </button>
        <button onClick={() => setBad((prevValue) => prevValue + 1)}>
          Bad
        </button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
