import axios from 'axios'
// const baseUrl = '/api/notes';
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async(newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.post(baseUrl, newObject, config)
  return response.then((response) => response.data)
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then((response) => response.data)
}

export default { getAll, create, update, setToken }
