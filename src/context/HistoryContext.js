import { createContext, useState, useEffect } from "react";
import { getAllHistoryAPI } from "../API/historyAPI";
export const AllHistoryContext = createContext({
  AllHistory: [],
  setAllHistory: () => {},
});

function HistoryProvider({ children }) {
  const [AllHistory, setAllHistory] = useState([]);
  useEffect(() => {
    getAllHistoryAPI().then((res) => setAllHistory(res?.data?.reverse()));
  }, []);
  return (
    <AllHistoryContext.Provider
      value={{
        AllHistory,
        setAllHistory,
      }}
    >
      {children}
    </AllHistoryContext.Provider>
  );
}
export default HistoryProvider;
