import axios from "axios";
const baseURL = "https://todolist-server-mqz8.onrender.com/history";

const getAllHistoryAPI = async () => {
  const result = axios.get(baseURL);
  return result;
};
const createNewHistoryAPI = async (newHistory) => {
  const result = axios.post(`${baseURL}`, newHistory);
  return result;
};

export { getAllHistoryAPI, createNewHistoryAPI };
