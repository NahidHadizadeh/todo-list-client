import { InputGroup, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import useSearchMember from "../../hooks/SearchMember/useSearchMember";

function SearchInput() {
  const SearchNameData = useSearchMember();

  function handleSearchMemberr(e) {
    SearchNameData.setSearchName(
      document.querySelector(".SearchName").value?.trim()
    );
    document.querySelector(".SearchName").value = "";
  }
  const handleShearch = (e) => {
    SearchNameData.setSearchName(e.target.value.trim());
  };

  return (
    <>
      <InputGroup
        className={" mb-3 px-3 bg-dark-blue"}
        onChange={(e) => {
          handleShearch(e);
        }}
      >
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
