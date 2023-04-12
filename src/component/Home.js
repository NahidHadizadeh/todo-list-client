import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTodosAPI, deleteOneTodoAPI } from "../API/todoListAPI";
import CreateTodo from "./CreateTodo";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineStar } from "react-icons/ai";
import EditTodo from "./EditTodo";
import Timer from "./Timer/Timer";
import NavbarProject from "./Navbar";
import AddButton from "./AddButton";

function ShowModalAllTodos() {
  //
  const navigate = useNavigate();
  //// set showmodal value and show and hidden it
  const [ShowModal, setShowModal] = useState(false);
  const [ShowModalEdit, setShowModalEdit] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };
  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    navigate("/");
  };
  const handleShowModal = () => setShowModal(true);
  const handleShowModalEdit = () => setShowModalEdit(true);

  //// handle click for show modal and Add todo
  function handleAddTodo() {
    handleShowModal();
    navigate("/create");
  }
  //// set All todos
  const [AllTodos, setAllTodos] = useState([]);
  const [TodoForEdit, setTodoForEdit] = useState({});

  useEffect(() => {
    //// get all todos with API
    getAllTodosAPI().then((res) => {
      setAllTodos(res.data);
    });
  }, []);
  //// handle delete
  const handleDelete = (id) => {
    deleteOneTodoAPI(id);
    navigate(0);
  };

  //// handle edit
  const handleEdit = (id, title) => {
    handleShowModalEdit();
    setTodoForEdit({ id, title });
    navigate("/edit");
  };
  //// handleBoler
  const handleBoler = (id) => {
    document.getElementById(`${id}`).classList.add("bolder-text");
  };
  return (
    <>
      <NavbarProject />
      <div className="container sectionbox">
        <CreateTodo handleCloseModal={handleCloseModal} ShowModal={ShowModal} />
        <EditTodo
          handleCloseModal={handleCloseModalEdit}
          ShowModal={ShowModalEdit}
          TodoForEdit={TodoForEdit}
        />
        <h3>Todo List</h3>

        {/* <button
          id="addButton"
          className="btn btn-primary "
          onClick={handleAddTodo}
        >
          Add To List
        </button> */}
        <AddButton BtnText="Add New Task" />
        <ul id="todoList">
          {AllTodos.length ? (
            AllTodos?.map((todo, index) => {
              const { title } = todo;
              return (
                <li className="completed well" key={index}>
                  <label id={todo._id + "title"} className="">
                    {title}
                  </label>
                  <div>
                    <Timer deadline={new Date()} e={this} />
                    <button
                      className="btn btn-success editBtn"
                      onClick={() => handleEdit(todo._id, todo.title)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btn btn-danger deleteBtn"
                      onClick={() => handleDelete(todo._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                    <button
                      className="btn btn-warning starBtn"
                      onClick={() => handleBoler(`${todo._id}title`)}
                    >
                      <AiOutlineStar />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li>
              <p>Loding...</p>
            </li>
          )}
        </ul>
        {/* <Timer /> */}
      </div>
    </>
  );
}
export default ShowModalAllTodos;
