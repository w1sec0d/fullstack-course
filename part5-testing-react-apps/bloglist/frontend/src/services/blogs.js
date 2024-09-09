import axios from "axios";
const baseUrl = "/api/blogs"

let token = null;
  
const setToken = newToken =>{
  token = `Bearer ${newToken}`
  console.log(token);
}

const getBlogs = async() => {
  const response = await axios.get(baseUrl);
  return response.data
}

const createBlog = async(blog) => {
  const config = {
    headers: {Authorization: token}
  }

  console.log({baseUrl});
  console.log({blog});
  console.log({config});
  
  const request = await axios.post(baseUrl, blog, config)
  
  return request.data
}

export default {getBlogs, setToken, createBlog}