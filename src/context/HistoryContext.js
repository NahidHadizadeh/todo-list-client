import { createContext, useState, useEffect } from "react";
// import { getAllChangingAPI } from "../API/membersAPI";
import { getAllHistoryAPI } from "../API/historyAPI";
export const AllHistoryContext = createContext({
  AllHistory: [],
  setAllHistory: () => {},
  // allHistory:[],
  // setAllHistory:()=>{}
  // setOneMember: () => {},
});

function HistoryProvider({ children }) {
  //   const [ShowModal, setShowModal] = useState(false);
  const [AllHistory, setAllHistory] = useState([]);
  // const [allHistory, setAllHistory] = useState([]);
  console.log(AllHistory?.reverse());
  useEffect(() => {
    getAllHistoryAPI().then((res) => setAllHistory(res.data?.reverse()));
  }, []);
  return (
    <AllHistoryContext.Provider
      value={{
        AllHistory,
        setAllHistory,
        // allHistory,
        // setAllHistory,
        // setOneMember,
      }}
    >
      {children}
    </AllHistoryContext.Provider>
  );
}
export default HistoryProvider;
// //////////////////////////////////
