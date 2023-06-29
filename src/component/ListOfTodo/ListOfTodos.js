import React from "react";
import { Col } from "react-bootstrap";
import "./listOfTodo.css";
import MemberIconComponent from "../MemberIconComponent";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import useAllTasks from "../../hooks/AllTasks/useAllTasks";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";

export default function ListOfTodos() {
  const AllMembers = useAllMembers().AllMembers;
  const AllTasks = useAllTasks().AllTasks;

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
                      // onClick={() => handleDelete(task)}
                    >
                      <AiOutlineDelete />
                    </button>
                    <button
                      className="btn btn-success "
                      onClick={() => {
                        // setIsComplete("click");
                        // setTaskIsComplete(task);
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
