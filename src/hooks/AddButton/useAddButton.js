import { useContext } from "react";
import { AddBtnContext } from "../../context/AddButtonContext";

const useAddButton = () => {
  const data = useContext(AddBtnContext);
  // console.log(data);
  return data;
};
export default useAddButton;
