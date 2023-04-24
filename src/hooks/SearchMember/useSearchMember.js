import { useContext } from "react";
import { SearchMemberContext } from "../../context/SearchMember";

const useSearchMember = () => {
  const data = useContext(SearchMemberContext);
  return data;
};
export default useSearchMember;
