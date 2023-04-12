import { getAllMembersAPI } from "../API/membersAPI";
import NavbarProject from "../component/Navbar";
import SearchInput from "../component/SearchInput/SearchInput";
import AddButton from "../component/AddButton";
import "../component/SearchInput/SearchInputStyle.css";
import AddMember from "../component/AddMember/AddMember";
import useAddButton from "../hooks/AddButton/useAddButton";
import CardMembers from "../component/Card/CardMembers";
import { useState, useEffect } from "react";

function Members() {
  const data = useAddButton();
  // const [searchName, setSearchName] = useState("");

  return (
    <>
      <NavbarProject />
      <section className="container">
        <AddMember ShowModal={data.ShowModal} />
        <div className=" searchBox">
          <SearchInput />
          <AddButton BtnText="Add Member" />
        </div>
      </section>
      <CardMembers />
    </>
  );
}
export default Members;
