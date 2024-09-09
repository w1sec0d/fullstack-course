import axios from "axios";
const baseUrl = "/api/blogs"

const getBlogs = async() => {
  const response = await axios.get(baseUrl);
  return response.data
}

export default {getBlogs}