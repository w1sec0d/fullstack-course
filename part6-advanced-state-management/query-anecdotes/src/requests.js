import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const fetchAnecdotes = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};
