import { createContext, useState, useEffect } from "react";
import { getAllTodosAPI } from "../API/todoListAPI";
export const AllTasksContext = createContext({
  AllTasks: [],
  setAllTasks: () => {},
});

function AllTasksProvider({ children }) {
  //   const [ShowModal, setShowModal] = useState(false);
  const [AllTasks, setAllTasks] = useState([]);

  useEffect(() => {
    // get all todos with API
    getAllTodosAPI().then((res) => {
      setAllTasks(res.data);
    });
  }, []);
  return (
    <AllTasksContext.Provider
      value={{
        AllTasks,
        setAllTasks,
      }}
    >
      {children}
    </AllTasksContext.Provider>
  );
}
export default AllTasksProvider;
// //////////////////////////////////
