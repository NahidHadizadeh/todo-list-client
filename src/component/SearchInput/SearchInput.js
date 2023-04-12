import { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import useSearchMember from "../../hooks/SearchMember/useSearchMember";

function SearchInput() {
  console.log("search name");
  const SearchNameData = useSearchMember();
  // function handleSearchMember(e) {
  //   if (e.target.value) {
  //     setSearchName(e.target.value.trim().toLowerCase());
  //   }
  // }
  function handleSearchMemberr(e) {
    SearchNameData.setSearchName(
      document.querySelector(".SearchName").value?.trim().toLowerCase()
    );
    document.querySelector(".SearchName").value = "";
  }
  //   if (e.target.value && e.target.tagName === "input") {
  //     let SearchValue = `${
  //       e.target.value[0]?.toUpperCase() +
  //       e.target.value?.toLowerCase().slice(1)
  //     }`;
  //     GetNameCountry(SearchValue);
  //     // click on search icon
  //   } else if (
  //     e.target.tagName !== "input" &&
  //     document.querySelector(".form-control").value
  //   ) {
  //     let SearchValue = `${
  //       document.querySelector(".form-control").value[0]?.toUpperCase() +
  //       document.querySelector(".form-control").value?.toLowerCase().slice(1)
  //     }`;
  //     GetNameCountry(SearchValue);
  //     // if input was empty,send "" not undefined
  //   } else {
  //     GetNameCountry("");
  //   }
  // }
  return (
    <>
      <InputGroup className={" mb-3 px-3 bg-dark-blue"}>
        <BsSearch
          className="m-auto search-icon"
          onClick={(e) => {
            handleSearchMemberr(e);
          }}
        />
        <Form.Control
          className={"SearchName"}
          placeholder="search member"
          // onChange={(e) => {
          //   handleSearchMember(e);
          // }}
        />
      </InputGroup>
    </>
  );
}

export default SearchInput;
