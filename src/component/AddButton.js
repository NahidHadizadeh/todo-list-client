// import useAddButton from "../hooks/AddButton/useAddButton";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddButton from "../hooks/AddButton/useAddButton";
// import { AddBtnContext } from "../context/addButton/AddButtonContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function AddButton({ BtnText }) {
  const data = useAddButton();
  //   const data = useAddButton();
  //   console.log(data);
  const navigate = useNavigate();
  // const [ShowModal, setShowModal] = useState(false);
  // const handleShowModal = () => data.setShowModal(true);

  function handleAddMember() {
    console.log("add Member");
    // data.ShowModal ? navigate("/members/addMember") : navigate("/members");
    // if ((BtnText = "Add Member")) {
    data.setShowModal(true);
    navigate("/members/addMember");
    // } else {

    // }
    // data.setHandleAddMember(() => {
    //   // handleShowModal();
    //   data.setShowModal(true);
    // });
  }
  // function handleEditTask() {
  //   data.setShowModal(true);
  //   navigate("/edit");
  // }
  function handelAddTask() {
    console.log("add task");
    data.setShowModal(true);
    navigate("/createTask");
    //   handleShowModal();
    // navigate("/create");
  }
  // function handleClick() {
  //   if (BtnText === "Add Member") {
  //     handleAddMember();
  //   } else if (BtnText === "Add New Task") {
  //     handelAddTask();
  //   } else {
  //     handleEditTask();
  //   }
  // }
  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   if (BtnText === "Add Member") {
  //     navigate("/member");
  //   } else {
  //     navigate("/");
  //   }
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   navigate("/");
  // };
  return (
    <button
      id="addButton"
      className="btn bg-dark-blue "
      onClick={
        // handleClick
        BtnText === "Add Member"
          ? handleAddMember
          : //   : BtnText === "Add New Task"
            handelAddTask
        //   : handleEditTask
      }
    >
      {BtnText}
    </button>
  );
}
export default AddButton;
