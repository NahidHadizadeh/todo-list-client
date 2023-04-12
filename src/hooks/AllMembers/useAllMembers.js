import { useContext } from "react";
import { AllMembersContext } from "../../context/MembersContext";

const useAllMembers = () => {
  const data = useContext(AllMembersContext);
  return data;
};
export default useAllMembers;
