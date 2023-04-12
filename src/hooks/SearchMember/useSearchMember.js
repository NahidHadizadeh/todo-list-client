import { useContext } from "react";
// import { AllMembersContext } from "../../context/MembersContext";
import { SearchMemberContext } from "../../context/SearchMember";

const useSearchMember = () => {
  const data = useContext(SearchMemberContext);
  return data;
};
export default useSearchMember;
