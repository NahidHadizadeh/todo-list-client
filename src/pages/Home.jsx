import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTodosAPI, deleteOneTodoAPI } from "../API/todoListAPI";
import CreateTodo from "../component/CreateTodo";
import EditTodo from "../component/EditTodo";
import NavbarProject from "../component/Navbar";
import TableProj from "../component/TableProj";
import AddButton from "../component/AddButton";
import CreateTask from "../component/CreateTodo";
import useAddButton from "../hooks/AddButton/useAddButton";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import { FaUserCircle } from "react-icons/fa";

function Home() {
  const dataBtn = useAddButton();
  const AllTasks = useAllTasks().AllTasks;
  const AllMembers = useAllMembers().AllMembers;
  const navigate = useNavigate();
  //// set showmodal value and show and hidden it

  return (
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
                    <div className="displayImage adminImage">
                      {/* <img
                        src="./user.png"
                        alt={member.title}
                        title={member.title}
                      /> */}
                      <FaUserCircle />
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="listOfMembers">
            {AllMembers?.map((member) => {
              if (!member.admin)
                return (
                  <div className="displayImage memberImage">
                    {/* <img
                      src="/client/public/user.png"
                      alt={member.title}
                      title={member.title}
                    /> */}
                    <FaUserCircle />
                  </div>
                );
            })}
          </div>
        </section>
        <h3>Todo List</h3>
        <div className="newTaskAndTotalBox">
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
