import { createContext, useState, useEffect } from "react";
export const SearchMemberContext = createContext({
  SearchName: [],
  setSearchName: () => {},
  // setOneMember: () => {},
});
export const TasksOfMemberContext = createContext({
  MembersTasks: [],
  setMembersTask: () => {},
});
function SearchNameProvider({ children }) {
  //   const [ShowModal, setShowModal] = useState(false);
  const [SearchName, setSearchName] = useState("");

  //   useEffect(() => {
  //     // get all todos with API
  //     getAllMembersAPI().then((res) => {
  //       setAllMembers(res.data);
  //     });
  //     // updateOneMemberAPI(id, newMember);
  //   }, []);
  return (
    <SearchMemberContext.Provider
      value={{
        SearchName,
        setSearchName,
        // setOneMember,
      }}
    >
      {children}
    </SearchMemberContext.Provider>
  );
}
export default SearchNameProvider;
// //////////////////////////////////
