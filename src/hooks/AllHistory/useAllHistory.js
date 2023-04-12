import { useContext } from "react";
import { AllHistoryContext } from "../../context/HistoryContext";

const useAllHistory = () => {
  const data = useContext(AllHistoryContext);
  return data;
};
export default useAllHistory;
