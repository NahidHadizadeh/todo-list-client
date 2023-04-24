import { createContext, useState, useEffect } from "react";
import { getAllMembersAPI } from "../API/membersAPI";
export const AllMembersContext = createContext({
  AllMembers: [],
  setAllMembers: () => {},
});

function AllMembersProvider({ children }) {
  const [AllMembers, setAllMembers] = useState([]);

  useEffect(() => {
    // get all todos with API
    getAllMembersAPI().then((res) => {
      setAllMembers(res.data);
    });
  }, []);
  return (
    <AllMembersContext.Provider
      value={{
        AllMembers,
        setAllMembers,
      }}
    >
      {children}
    </AllMembersContext.Provider>
  );
}
export default AllMembersProvider;
