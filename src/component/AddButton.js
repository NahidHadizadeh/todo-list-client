import { useNavigate } from "react-router-dom";
import useAddButton from "../hooks/AddButton/useAddButton";

function AddButton({ BtnText }) {
  const data = useAddButton();
  const navigate = useNavigate();

  function handleAddMember() {
    data.setShowModal(true);
    navigate("/members/addMember");
  }
  function handelAddTask() {
    data.setShowModal(true);
    navigate("/createTask");
  }

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
