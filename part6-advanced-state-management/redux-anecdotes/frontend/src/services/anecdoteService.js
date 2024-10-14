import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};

export default { getAll };
