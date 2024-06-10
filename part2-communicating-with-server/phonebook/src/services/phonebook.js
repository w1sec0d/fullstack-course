import axios from "axios";
const baseURL = "http://localhost:3001/contacts";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const get = (contactId) => {
  const request = axios.get(`${baseURL}/${contactId}`);
  return request.then((res) => res.data);
};

const create = (newContact) => {
  const request = axios.post(baseURL, newContact);
  return request.then((res) => res.data);
};

const deleteContact = (contactId) => {
  const request = axios.delete(`${baseURL}/${contactId}`);
  return request.then((res) => res.data);
};

export default { create, get, getAll, deleteContact };
