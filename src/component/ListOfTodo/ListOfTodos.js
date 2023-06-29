import React from "react";
import { Col } from "react-bootstrap";
import "./listOfTodo.css";
import MemberIconComponent from "../MemberIconComponent";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import useAllTasks from "../../hooks/AllTasks/useAllTasks";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { createNewHistoryAPI } from "../../API/historyAPI";
import { updateOneMemberAPI } from "../../API/membersAPI";
import { deleteOneTodoAPI, updateOneTodoAPI } from "../../API/todoListAPI";

export default function ListOfTodos() {
  const AllMembers = useAllMembers().AllMembers;
  const AllTasks = useAllTasks().AllTasks;
  const navigate = useNavigate();

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
    await deleteOneTodoAPI(task._id);
    AllMembers.filter((mem) => {
      if (mem.tasks.length > 0 && mem.name === task.manager) {
        mem.tasks.map((taskOfMember) => {
          if (taskOfMember === task.title) {
            updateOneMemberAPI(mem._id, {
              ...mem,
              tasks: mem.tasks.filter((tas) => tas !== task.title),
            });
          }
        });
      }
    });
    // ////create history for delete tasks
    await createNewHistoryAPI({
      title: "Deleted",
      newTodo: { ...task },
    });
    navigate(0);
  }

  return (
    <section>
      <div className="main-row">
        {/* sm={12} md={6} lg={4} xl={4} */}
        <Col className="columns-todo col-12">
          {AllTasks?.map((task, index) => {
            return (
              <div key={index + "tasks"} className="todo-box">
                <div className="line1-todo">
                  <span
                    className={task.complete ? "taskBox greenText" : "taskBox"}
                  >
                    {task.title}
                  </span>
                  <div>
                    <button
                      className="btn btn-warning "
                      onClick={() => {
                        // setShowModal(true);
                        // setTodoForEdit(task);
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDelete(task)}
                    >
                      <AiOutlineDelete />
                    </button>
                    <button
                      className="btn btn-success "
                      onClick={() => {
                        // setIsComplete("click");
                        // setTaskIsComplete(task);
                        handleComplete(task);
                      }}
                    >
                      <GrCompliance />
                    </button>
                  </div>
                </div>
                <div className="managers-todo">
                  <div className="d-flex text-light">
                    {AllMembers?.map((member) => {
                      if (task.manager?.includes(member.name)) {
                        return <MemberIconComponent member={member} />;
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </Col>
        {/* <Col sm={12} md={6} lg={4} xl={3} className="columns-todo">
          2
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} className="columns-todo">
          3
        </Col> */}
        {/* <Col sm={12} md={6} lg={4} xl={3} className="columns-todo">
          4
        </Col> */}
      </div>
    </section>
  );
}
