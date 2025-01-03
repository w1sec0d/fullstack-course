import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlogsPerUser = async ({userId}) => {
  const urlEnd = userId ? `/${String(userId)}`:""
  
  const response = await axios.get(baseUrl + '/blogsPerUser' + urlEnd)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, blog, config)

  return request.data
}

const updateBlog = async ({id, blog}) => {
  const config = {
    headers: { Authorization: token },
  }
  const updatedBlog = await axios.put(`${baseUrl}/${id}`, blog, config)
  return updatedBlog.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getBlogs, getBlogsPerUser, setToken, createBlog, updateBlog, removeBlog }
