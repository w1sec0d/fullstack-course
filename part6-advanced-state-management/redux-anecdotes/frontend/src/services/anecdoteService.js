import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};

const createNew = async (anecdote) => {
  const object = { content: anecdote, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id) => {
  let anecdote = await axios.get(`${baseUrl}/${id}`);
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: anecdote.data.votes + 1,
  });
  return response.data;
};

export default { getAll, createNew, vote };
