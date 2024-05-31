import { useState } from "react";

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
      <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
    </>
  );
};

export default App;
