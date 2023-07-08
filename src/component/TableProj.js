import Table from "react-bootstrap/Table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import { updateOneTodoAPI, deleteOneTodoAPI } from "../API/todoListAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTodo from "./EditTodo";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewHistoryAPI } from "../API/historyAPI";
import MemberIconComponent from "./MemberIconComponent";

function TableProj() {
  const [TodoForEdit, setTodoForEdit] = useState({});

  const AllTasks = useAllTasks().AllTasks;
  const AllMembers = useAllMembers().AllMembers;
  const [showModal, setShowModal] = useState(false);
  function handleCloseModal() {
    setShowModal(false);
    navigate("/");
  }
  //   // // handle isCompleted task
  const navigate = useNavigate();
  const [TaskIsComplete, setTaskIsComplete] = useState({});
  const [IsComplete, setIsComplete] = useState("");

  async function handleComplete(task) {
    updateOneTodoAPI(task._id, {
      ...task,
      complete: task.complete ? false : true,
      updatedOn: new Date(),
    });
    createNewHistoryAPI({
      title: task?.complete ? "Don't Complete" : "Completed",
      newTodo: { ...task },
    });
    navigate(0);
  }

  //  // handle delete task
  async function handleDelete(task) {
    // ------ delete task
    await deleteOneTodoAPI(task._id);

    // ------ edit task's member after delete task
    AllMembers?.map((member) => {
      if (task.manager?.includes(member.name)) {
        updateOneMemberAPI(member._id, {
          ...member,
          tasks: member.tasks.filter((tas) => tas !== task.title),
        });
      }
    });
    //create history for delete tasks
    await createNewHistoryAPI({
      title: "Deleted",
      newTodo: { ...task },
    });
    navigate(0);
  }

  return (
    <Table striped bordered hover variant="dark">
      <EditTodo
        ShowModal={showModal}
        TodoForEdit={TodoForEdit}
        handleCloseModal={handleCloseModal}
      />

      <thead>
        <tr>
          <th>....</th>
          {AllMembers.map((member, index) => {
            return (
              <th key={index + "sotoon"} className="text-center">
                {member.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {AllTasks?.map((task, index) => {
          return (
            <tr key={index + "task"}>
              <td
                colSpan={2}
                className={task.complete ? "taskBox greenText" : "taskBox"}
              >
                {task.title}
                <div className="d-flex text-light">
                  {AllMembers?.map((member) => {
                    if (task.manager?.includes(member.name)) {
                      return <MemberIconComponent member={member} />;
                    }
                  })}
                </div>
                <div key={index + "divv"} className="d-flex">
                  <button
                    className="btn btn-warning editBtn"
                    onClick={() => {
                      setShowModal(true);
                      setTodoForEdit(task);
                    }}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="btn btn-danger deleteBtn"
                    onClick={() => handleDelete(task)}
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    className="btn btn-success completeBtn"
                    onClick={() => {
                      setIsComplete("click");
                      setTaskIsComplete(task);
                      handleComplete(task);
                    }}
                  >
                    <GrCompliance />
                  </button>
                </div>
              </td>
              {AllMembers?.map((member, index) => {
                return (
                  <td key={index + "selectMember"} className="tdMembers">
                    {/* {task.manager === member.name ? "X" : ""} */}
                    {task.manager?.map((manage) => {
                      return manage === member.name ? "X" : "";
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableProj;
