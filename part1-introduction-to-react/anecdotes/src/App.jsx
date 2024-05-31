import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(
    Array(anecdotes.length).fill(0)
  );
  const mostVotedAnecdoteIndex = anecdotesVotes.indexOf(
    Math.max(...anecdotesVotes)
  );

  const handleVoteClick = () => {
    // Adds a vote to the anecdote
    let newAnecdotesVotes = [...anecdotesVotes];
    newAnecdotesVotes[selected] += 1;
    setAnecdotesVotes(newAnecdotesVotes);
  };

  const handleRandomQuoteClick = () => {
    // Gets a random quote
    let newValue = Math.floor(Math.random() * anecdotes.length);
    setSelected(newValue);
  };

  return (
    <>
      <section>
        <h1>Anecdote Of The Day</h1>
        <div>
          <q>{anecdotes[selected]}</q>
          <p>Has {anecdotesVotes[selected]} votes</p>
        </div>
        <button onClick={handleVoteClick}>Vote</button>
        <button onClick={handleRandomQuoteClick}>Random Quote</button>
      </section>
      <section>
        <h1>Anecdote With Most Votes</h1>
        <div>
          <q>{anecdotes[mostVotedAnecdoteIndex]}</q>
          <p>Has {anecdotesVotes[mostVotedAnecdoteIndex]} votes</p>
        </div>
      </section>
    </>
  );
};

export default App;
