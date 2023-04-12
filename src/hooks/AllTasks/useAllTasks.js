import { useContext } from "react";
import { AllTasksContext } from "../../context/TasksContext";
// import {AllTa}
const useAllTasks = () => {
  const data = useContext(AllTasksContext);
  //   console.log(data);
  return data;
};
export default useAllTasks;
