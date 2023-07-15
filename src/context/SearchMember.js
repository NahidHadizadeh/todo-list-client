import { createContext, useState } from "react";
export const SearchMemberContext = createContext({
  SearchName: [],
  setSearchName: () => {},
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
