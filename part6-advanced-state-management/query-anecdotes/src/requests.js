import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const fetchAnecdotes = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};

export const newAnecdote = async (anectode) => {
  const request = await axios.post(baseUrl, anectode);
  return request.data;
};

export const newVote = async (anecdote) => {
  const request = await axios.patch(baseUrl + `/${anecdote.id}`, {
    votes: anecdote.votes + 1,
  });
  return request.data;
};
