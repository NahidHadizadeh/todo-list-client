import { createContext, useState, useEffect } from "react";
export const SearchMemberContext = createContext({
  SearchName: [],
  setSearchName: () => {},
});
export const TasksOfMemberContext = createContext({
  MembersTasks: [],
  setMembersTask: () => {},
});
function SearchNameProvider({ children }) {
  const [SearchName, setSearchName] = useState("");

  return (
    <SearchMemberContext.Provider
      value={{
        SearchName,
        setSearchName,
      }}
    >
      {children}
    </SearchMemberContext.Provider>
  );
}
export default SearchNameProvider;
