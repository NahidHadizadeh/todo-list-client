import { useContext } from "react";
import { AllTasksContext } from "../../context/TasksContext";
const useAllTasks = () => {
  const data = useContext(AllTasksContext);
  return data;
};
export default useAllTasks;
