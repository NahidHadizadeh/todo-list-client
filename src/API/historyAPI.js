import axios from "axios";
const baseURL = "https://todolist-server-mqz8.onrender.com/history";

const getAllHistoryAPI = async () => {
  console.log("get all hist");
  const result = axios.get(baseURL);
  return result;
};
const createNewHistoryAPI = async (newHistory) => {
  console.log("creat hist");
  console.log(newHistory);

  const result = axios.post(`${baseURL}`, newHistory);
  return result;
};
// const getOneMemberAPI = async (id) => {
//   const result = axios.get(`${baseURL}/${id}`);
//   return result;
// };
// const deleteOneTodoAPI = async (id) => {
//   const result = axios.delete(`${baseURL}/${id}`);
//   return result;
// };
// const updateOneMemberAPI = async (id, newMember) => {
//   console.log("api updat");
//   const result = axios.patch(`${baseURL}/${id}`, newMember);
//   return result;
// };
export {
  //   createNewMemberAPI,
  getAllHistoryAPI,
  createNewHistoryAPI,
  //   getOneMemberAPI,
  //   deleteOneTodoAPI,
  //   updateOneMemberAPI,
};
