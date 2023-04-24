import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import useAddButton from "../hooks/AddButton/useAddButton";
import "../component/AddMember/addMember.css";
import { useEffect, useState } from "react";
import { getOneMemberAPI, updateOneMemberAPI } from "../API/membersAPI";
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
    manager: "",
    complete: false,
    updatedOn: new Date(),
    createdOn: new Date(),
  });

  useEffect(() => {
    console.log();
    if (NewTask.manager !== "") {
      // console.log(AllMembers.filter((mem) => mem.name === NewTask.manager));
      AllMembers.filter((member) => member.name === NewTask.manager).map(
        (mem) => {
          console.log("mem");
          updateOneMemberAPI(mem._id, {
            ...mem,
            tasks: [...mem.tasks, NewTask.title],
            // tasks: [...mem.tasks, NewTask.title],
          });
        }
      );
    }
    // AllMembers.map((member) => {
    //   console.log("mambers.map");
    //   if (member.name === NewTask.manager) {
    //     console.log("name===manager");
    //     updateOneMemberAPI(member._id, {
    //       ...member,
    //       tasks: [...member.tasks, NewTask.title],
    //     });
    //   }
    // });
    // }
  }, [NewTask]);

  function handleCloseModal() {
    dataBtn.setShowModal(false);
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // setNewTask({ ...NewTask, updatedOn: new Date(), createdOn: new Date() });

    // //////////validations
    // validatin title
    if (AllTasks.find((task) => task.title === NewTask.title)) {
      alert("this task is exist,select other task");
      return;
    }
    if (NewTask.manager === "select manager" || NewTask.manager === "") {
      alert("select manager");
      return;
    }
    // if (
    //   AllMembers.filter((member) => member?.name === NewTask?.manager).map(
    //     (mem) => mem.tasks.length > 5
    //   )
    // ) {
    //   alert("tasks of member is more,please select other member ");
    //   return;
    // }
    // //////

    //// create new todo API
    await createNewTodoAPI(NewTask);

    // ////create history for edit tasks
    await createNewHistoryAPI({
      title: "Created",
      newTodo: { ...NewTask },
    });
    console.log(NewTask);
    // updateOneMemberAPI(NewTask._id, {});
    ///// change url
    // refresh page for display all todos
    setNewTask({
      title: "",
      manager: "",
      complete: false,
      updatedOn: new Date(),
      createdOn: new Date(),
    });
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
          <Form.Group className="mb-3" controlId="ageForm.ControlInput1">
            <Form.Select
              size="sm"
              onChange={(e) => {
                setNewTask({
                  ...NewTask,
                  manager: e.target.value?.trim().toLowerCase(),
                });
              }}
            >
              <option value="select manager">select maager</option>
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTask;