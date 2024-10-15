import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
