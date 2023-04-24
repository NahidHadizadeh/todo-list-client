import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTodosAPI, deleteOneTodoAPI } from "../API/todoListAPI";
import CreateTodo from "../component/CreateTodo";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineStar } from "react-icons/ai";
import EditTodo from "../component/EditTodo";
// import Timer from "../component/Timer/Timer";
import NavbarProject from "../component/Navbar";
import TableProj from "../component/TableProj";
import AddButton from "../component/AddButton";
import CreateTask from "../component/CreateTodo";
import useAddButton from "../hooks/AddButton/useAddButton";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
// import AddButton from "../component/AddButton/AddButton";

function Home() {
  const dataBtn = useAddButton();
  const AllTasks = useAllTasks().AllTasks;
  const AllMembers = useAllMembers().AllMembers;
  // console.log(AllTasks);
  //
  const navigate = useNavigate();
  //// set showmodal value and show and hidden it
  // const [ShowModal, setShowModal] = useState(false);
  // const [ShowModalEdit, setShowModalEdit] = useState(false);
  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   navigate("/");
  // };
  // const handleCloseModalEdit = () => {
  //   setShowModalEdit(false);
  //   navigate("/");
  // };
  // const handleShowModal = () => setShowModal(true);
  // const handleShowModalEdit = () => setShowModalEdit(true);

  //// handle click for show modal and Add todo
  // function handleAddTodo() {
  //   handleShowModal();
  //   navigate("/create");
  // }
  //// set All todos
  // const [AllTodos, setAllTodos] = useState([]);

  // useEffect(() => {
  //   //// get all todos with API
  //   getAllTodosAPI().then((res) => {
  //     setAllTodos(res.data);
  //   });
  // }, []);
  //// handle delete

  return (
    // <h1>home</h1>
    <>
      <NavbarProject />
      <div className="container sectionbox">
        <CreateTask ShowModal={dataBtn.ShowModal} />
        <section className="d-flex align-items-center">
          <span>Members: </span>
          <div>
            <div className="listOfMembers">
              {AllMembers.map((member) => {
                if (member.admin)
                  return (
                    <div className="adminImage">
                      <img
                        src="/client/public/user.png"
                        alt={member.title}
                        title={member.title}
                      />
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="listOfMembers">
            {AllMembers?.map((member) => {
              if (!member.admin)
                return (
                  <div className="memberImage">
                    <img
                      src="/client/public/user.png"
                      alt={member.title}
                      title={member.title}
                    />
                  </div>
                );
            })}
          </div>
        </section>
        <h3>Todo List</h3>
        <div className="newTaskAndTotalBox">
          {/* <button
            id="addButton"
            className="btn btn-dark "
            onClick={handleAddTodo}
          >
            Add New Task
          </button> */}
          {/* <AddButton BtnText="Add New Task" /> */}
          <AddButton BtnText="Add New Task" />
          <label id="totalTasks" className="">
            total tasks : {AllTasks.length}
          </label>
        </div>

        <TableProj />
      </div>
    </>
  );
}
export default Home;
