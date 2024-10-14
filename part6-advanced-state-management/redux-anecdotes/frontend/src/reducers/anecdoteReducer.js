import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const sortByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes);
};

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    vote: (state, action) => {
      const id = action.payload;

      return sortByVotes(
        state.map((anecdote) => {
          if (anecdote.id === id) {
            return { ...anecdote, votes: anecdote.votes + 1 };
          } else {
            return anecdote;
          }
        })
      );
    },
    setAnecdotes: (state, action) => action.payload,
  },
});

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
