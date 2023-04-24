import { useContext } from "react";
import { AddBtnContext } from "../../context/AddButtonContext";

const useAddButton = () => {
  const data = useContext(AddBtnContext);
  return data;
};
export default useAddButton;
