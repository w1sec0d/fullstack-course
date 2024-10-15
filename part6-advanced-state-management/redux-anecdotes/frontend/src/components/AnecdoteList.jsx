import { useDispatch, useSelector } from "react-redux";
import { submitVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationRecucer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes,filter}) => {
    if (filter === "ALL"){
      return anecdotes
    }else{
      return [...anecdotes].filter((anecdote) => anecdote.content.includes(filter))
    }
  })

  const voteHandler = (anecdote) => {
    // Votes for the id and triggers the notification
    dispatch(submitVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return anecdotes.map((anecdote) => (
    <Anecdote
      anecdote={anecdote}
      handleClick={() => voteHandler(anecdote)}
      key={anecdote.id}
    />
  ));
};

export default AnecdoteList;
