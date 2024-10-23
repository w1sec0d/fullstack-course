import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const sortByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes);
};

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
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

export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;

// * asynchronous action creators

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(sortByVotes(anecdotes)));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const response = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(response));
  };
};

export const submitVote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id);
    dispatch(vote(id));
  };
};

export default anecdoteSlice.reducer;
