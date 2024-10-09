import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

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
  const anecdotes = useSelector((state) => state);

  return anecdotes.map((anecdote) => (
    <Anecdote
      anecdote={anecdote}
      handleClick={() => dispatch(vote(anecdote.id))}
      key={anecdote.id}
    />
  ));
};

export default AnecdoteList;
