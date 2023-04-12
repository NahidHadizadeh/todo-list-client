import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateOneTodoAPI } from "../API/todoListAPI";
// import useAddButton from "../hooks/AddButton/useAddButton";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewHistoryAPI } from "../API/historyAPI";
// import useAllChanging from "../hooks/AllHistory/useAllHistory";

function EditTodo({ ShowModal, TodoForEdit, handleCloseModal }) {
  const AllMembers = useAllMembers().AllMembers;
  const AllTasks = useAllTasks().AllTasks;
  // const AllChange = useAllChanging();

  const navigate = useNavigate();
  const [UpdateTodo, setUpdateTodo] = useState(TodoForEdit);
  useEffect(() => {
    setUpdateTodo(TodoForEdit);
  }, [TodoForEdit]);

  // //// close modal
  // const dataBtn = useAddButton();
  // ///// update member data base for tasks
  useEffect(() => {
    if (UpdateTodo !== TodoForEdit && UpdateTodo._id) {
      AllMembers.map((member) => {
        if (member.name === UpdateTodo.manager) {
          updateOneMemberAPI(member._id, {
            ...member,
            tasks: [...member.tasks, UpdateTodo.title],
          });
        } else {
          console.log(member.tasks.filter((task) => task !== UpdateTodo.title));
          updateOneMemberAPI(member._id, {
            ...member,
            tasks: member.tasks.filter((task) => task !== UpdateTodo.title),
          });
        }
      });
    }
  }, [UpdateTodo]);

  // handel submit form
  async function handleSubmit(e) {
    e.preventDefault();

    // //////////validations
    // validatin title
    if (UpdateTodo.title === "select task" || UpdateTodo.title === "") {
      alert("this task is exist,select other task");
      return;
    }
    if (UpdateTodo.manager === "select manager" || UpdateTodo.manager === "") {
      alert("select manager");
      return;
    }
    // close modal
    handleCloseModal();
    setUpdateTodo({ ...UpdateTodo, updateOn: new Date() });
    updateOneTodoAPI(TodoForEdit._id, UpdateTodo);

    // ////create history for edit tasks
    await createNewHistoryAPI({
      title: "edited",
      newTodo: { ...UpdateTodo },
      todoForEdit: { ...TodoForEdit },
    });
    // change url
    navigate(0);
    navigate("/");

    // set initioal value for todo
    setUpdateTodo({});
  }

  return (
    <Modal show={ShowModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter task title"
              // autoFocus
              value={TodoForEdit.title}
              onChange={(e) =>
                setUpdateTodo({ ...UpdateTodo, title: e.target.value })
              }
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="ageForm.ControlInput1">
            <Form.Label>title:</Form.Label>
            <Form.Select
              size="sm"
              value={UpdateTodo.title?.trim()?.toLowerCase()}
              onChange={(e) => {
                setUpdateTodo({
                  ...UpdateTodo,
                  title: e.target.value?.trim().toLowerCase(),
                });
              }}
            >
              {AllTasks?.map((task, index) => {
                return (
                  <option key={index + "option"} value={task.title}>
                    {task.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="ageForm.ControlInput1">
            <Form.Label>manager:</Form.Label>
            <Form.Select
              size="sm"
              value={UpdateTodo.manager?.trim().toLowerCase()}
              onChange={(e) => {
                setUpdateTodo({
                  ...UpdateTodo,
                  manager: e.target.value?.trim().toLowerCase(),
                });
              }}
            >
              {AllMembers?.map((member, index) => {
                return (
                  <option key={index + "option"} value={member.name}>
                    {member.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTodo;
