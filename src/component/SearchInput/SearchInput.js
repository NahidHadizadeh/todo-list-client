import { InputGroup, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import useSearchMember from "../../hooks/SearchMember/useSearchMember";

function SearchInput() {
  const SearchNameData = useSearchMember();

  function handleSearchMemberr(e) {
    SearchNameData.setSearchName(
      document.querySelector(".SearchName").value?.trim().toLowerCase()
    );
    document.querySelector(".SearchName").value = "";
  }

  return (
    <>
      <InputGroup className={" mb-3 px-3 bg-dark-blue"}>
        <BsSearch
          className="m-auto search-icon"
          onClick={(e) => {
            handleSearchMemberr(e);
          }}
        />
        <Form.Control className={"SearchName"} placeholder="search member" />
      </InputGroup>
    </>
  );
}

export default SearchInput;
