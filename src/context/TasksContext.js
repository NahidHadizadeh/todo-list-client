import { createContext, useState, useEffect } from "react";
import { getAllTodosAPI } from "../API/todoListAPI";
export const AllTasksContext = createContext({
  AllTasks: [],
  setAllTasks: () => {},
});

function AllTasksProvider({ children }) {
  const [AllTasks, setAllTasks] = useState([]);

  useEffect(() => {
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
