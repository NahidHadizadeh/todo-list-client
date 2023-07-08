import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import useAddButton from "../hooks/AddButton/useAddButton";
import "../component/AddMember/addMember.css";
import { useState } from "react";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewTodoAPI } from "../API/todoListAPI";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import { createNewHistoryAPI } from "../API/historyAPI";

function CreateTask({ ShowModal }) {
  const AllMembers = useAllMembers().AllMembers;
  const AllTasks = useAllTasks().AllTasks;
  const dataBtn = useAddButton();

  const navigate = useNavigate();
  const [NewTask, setNewTask] = useState({
    title: "",
    manager: [],
    complete: false,
    updatedOn: new Date(),
    createdOn: new Date(),
  });

  function handleCloseModal() {
    dataBtn.setShowModal(false);
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // validatin title
    if (AllTasks.find((task) => task.title === NewTask.title)) {
      alert("this task is exist,select other task");
      return;
    }
    if (NewTask.manager.length === 0) {
      alert("select manager");
      return;
    }

    await createNewTodoAPI(NewTask);
    // ---------------------- update task of member
    AllMembers?.map((member) => {
      if (
        NewTask?.manager?.includes(member.name) &&
        !member.tasks?.includes(NewTask.title)
      ) {
        updateOneMemberAPI(member._id, {
          ...member,
          tasks: [...member.tasks, NewTask.title],
        });
      }
    });
    // --------------------------------- end update
    await createNewHistoryAPI({
      title: "Created",
      newTodo: { ...NewTask },
    });
    // refresh page for display all todos
    navigate("/");
    navigate(0);
  }

  return (
    <Modal show={ShowModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Member Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="enter task title"
              onChange={(e) =>
                setNewTask({
                  ...NewTask,
                  title: e.target.value?.trim().toLowerCase(),
                })
              }
            />
          </Form.Group>
          <Form.Group className="check-box">
            {AllMembers?.map((member, index) => {
              return (
                <Form.Check
                  key={index + "custom-check"}
                  type="switch"
                  id={"custom-switch"}
                  label={member.name}
                  value={member.name}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewTask({
                        ...NewTask,
                        manager: [
                          ...NewTask.manager,
                          e.target.value?.trim().toLowerCase(),
                        ],
                      });
                    } else {
                      //--------------- delete manager that checked is false
                      const newTaskManagerArr = NewTask.manager?.filter(
                        (manage) =>
                          !(manage === e.target.value?.trim().toLowerCase())
                      );
                      setNewTask({
                        ...NewTask,
                        manager: [...newTaskManagerArr],
                      });
                    }
                  }}
                />
              );
            })}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTask;
