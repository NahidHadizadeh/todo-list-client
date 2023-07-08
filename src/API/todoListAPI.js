import axios from "axios";
// const baseURL = "http://localhost:3005/tasks";
const baseURL = "https://todolist-server-mqz8.onrender.com/tasks";

const getAllTodosAPI = async () => {
  const result = axios.get(baseURL);
  return result;
};
const createNewTodoAPI = async (todoTitle) => {
  const result = axios.post(`${baseURL}/create`, todoTitle);
  return result;
};
const getOneTodoAPI = async (id) => {
  const result = axios.get(`${baseURL}/${id}`);
  return result;
};
const deleteOneTodoAPI = async (id) => {
  const result = axios.delete(`${baseURL}/${id}`);
  return result;
};
const updateOneTodoAPI = async (id, newTodo) => {
  const result = axios.patch(`${baseURL}/${id}`, newTodo);
  return result;
};
export {
  createNewTodoAPI,
  getAllTodosAPI,
  getOneTodoAPI,
  deleteOneTodoAPI,
  updateOneTodoAPI,
};
