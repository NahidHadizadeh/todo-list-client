import axios from "axios";
const baseURL = "https://todolist-server-mqz8.onrender.com/members";

const getAllMembersAPI = async () => {
  const result = axios.get(baseURL);
  return result;
};
const createNewMemberAPI = async (newMember) => {
  const result = axios.post(`${baseURL}`, newMember);
  return result;
};
const getOneMemberAPI = async (id) => {
  const result = axios.get(`${baseURL}/${id}`);
  return result;
};

const updateOneMemberAPI = async (id, newMember) => {
  const result = axios.patch(`${baseURL}/${id}`, newMember);
  return result;
};
export {
  createNewMemberAPI,
  getAllMembersAPI,
  getOneMemberAPI,
  updateOneMemberAPI,
};
