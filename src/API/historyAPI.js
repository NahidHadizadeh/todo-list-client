import axios from "axios";
// const baseURL = "http://localhost:3005/history";
const baseURL = "https://todolist-server-mqz8.onrender.com/history";

const getAllHistoryAPI = async () => {
  const result = axios.get(baseURL);
  return result;
};
const createNewHistoryAPI = async (newHistory) => {
  const result = axios.post(`${baseURL}`, newHistory);
  return result;
};
const deleteHistoryAPI = async (id) => {
  const result = await axios.delete(baseURL);
  return result;
};
export { getAllHistoryAPI, createNewHistoryAPI, deleteHistoryAPI };
