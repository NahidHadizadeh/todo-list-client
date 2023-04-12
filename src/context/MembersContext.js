import { createContext, useState, useEffect } from "react";
import { getAllMembersAPI } from "../API/membersAPI";
export const AllMembersContext = createContext({
  AllMembers: [],
  setAllMembers: () => {},
  // setOneMember: () => {},
});

function AllMembersProvider({ children }) {
  //   const [ShowModal, setShowModal] = useState(false);
  const [AllMembers, setAllMembers] = useState([]);

  useEffect(() => {
    // get all todos with API
    getAllMembersAPI().then((res) => {
      setAllMembers(res.data);
    });
    // updateOneMemberAPI(id, newMember);
  }, []);
  return (
    <AllMembersContext.Provider
      value={{
        AllMembers,
        setAllMembers,
        // setOneMember,
      }}
    >
      {children}
    </AllMembersContext.Provider>
  );
}
export default AllMembersProvider;
// //////////////////////////////////
