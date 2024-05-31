import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  const averageFeedback = (good, bad, total) => (good - bad) / total;

  const positiveFeedBack = (good, total) => (good / total) * 100;

  return (
    <div>
      {total === 0 && <p>No feedback given</p>}
      {total > 0 && (
        <>
          <h1>Statistics</h1>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={good + neutral + bad} />
          <StatisticLine
            text="Average"
            value={averageFeedback(good, bad, total).toFixed(2)}
          />
          <StatisticLine
            text="Positive"
            value={positiveFeedBack(good, total).toFixed(2)}
          />
        </>
      )}
    </div>
  );
};

const Button = ({ incrementFunction, children }) => (
  <button onClick={() => incrementFunction((prevValue) => prevValue + 1)}>
    {children}
  </button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button incrementFunction={setGood}>Good</Button>
        <Button incrementFunction={setNeutral}>Neutral</Button>
        <Button incrementFunction={setBad}>Bad</Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
