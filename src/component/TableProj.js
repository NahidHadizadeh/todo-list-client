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

function TableProj() {
  const [TodoForEdit, setTodoForEdit] = useState({});

  const AllTasks = useAllTasks().AllTasks;
  const AllMembers = useAllMembers().AllMembers;
  // const dataBtnFormEdit = useAddButton();
  const [showModal, setShowModal] = useState(false);
  function handleCloseModal() {
    setShowModal(false);
    navigate("/");
  }
  //   // // handle isCompleted task
  const navigate = useNavigate();
  const [TaskIsComplete, setTaskIsComplete] = useState({});
  const [IsComplete, setIsComplete] = useState("");
  useEffect(() => {
    console.log("is compl", IsComplete);
    // const isCompleted = !TaskIsComplete.complete;
    if (TaskIsComplete.manager) {
      updateOneTodoAPI(TaskIsComplete._id, {
        ...TaskIsComplete,
        complete: !TaskIsComplete.complete,
        updatedOn: new Date(),
      });
    }
  }, [TaskIsComplete]);
  useEffect(() => {
    // ////create history for complete tasks
    if (TaskIsComplete !== {} && IsComplete === "click") {
      console.log("!=={}");
      console.log(TaskIsComplete);
      createNewHistoryAPI({
        title: TaskIsComplete?.complete ? "Don't Complete" : "Completed",
        newTodo: { ...TaskIsComplete },
      });
      navigate(0);
    } else {
      console.log("==={}");
    }
  }, [IsComplete]);


  //  // handle delete task
  async function handleDelete(task) {
    await deleteOneTodoAPI(task._id);
    AllMembers.filter((mem) => mem.name === task.title).map((member) => {
      updateOneMemberAPI(member._id, {
        ...member,
        tasks: member.tasks.filter((tas) => tas !== task.title),
      });
    });
    // ////create history for delete tasks
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
            return <th key={index + "sotoon"} className="text-center">{member.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {AllTasks?.map((task, index) => {
          return (
            <tr key={index}>
              <td
                colSpan={2}
                className={task.complete ? "taskBox greenText" : "taskBox"}
              >
                {task.title}
                <div key={index + "divv"} className="d-flex">
                  {/* <Timer deadline={new Date()} e={this} /> */}
                  <button
                    className="btn btn-warning editBtn"
                    onClick={() => {
                      setShowModal(true);
                      console.log("edit");
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
                      console.log(task);
                      setIsComplete("click");
                      setTaskIsComplete(task);
                    }}
                  >
                    <GrCompliance />
                  </button>
                </div>
              </td>
              {AllMembers?.map((member, index) => {
                return (
                  <td key={index + "selectMember"} className="tdMembers">
                    {task.manager === member.name ? "X" : ""}
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
