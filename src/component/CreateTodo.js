import { Button, Form, Modal } from "react-bootstrap";
import useAddButton from "../hooks/AddButton/useAddButton";
import "../component/AddMember/addMember.css";
import { useState } from "react";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewTodoAPI, deleteOneTodoAPI } from "../API/todoListAPI";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import { createNewHistoryAPI } from "../API/historyAPI";

function CreateTask({ ShowModal }) {
  const AllMembers = useAllMembers().AllMembers;
  const setAllMembers = useAllMembers().setAllMembers;
  const AllTasks = useAllTasks().AllTasks;
  const setAllTasks = useAllTasks().setAllTasks;
  const dataBtn = useAddButton();

  const [NewTask, setNewTask] = useState({
    title: "",
    manager: [],
    complete: false,
    updatedOn: new Date(),
    createdOn: new Date(),
  });

  function handleCloseModal() {
    dataBtn.setShowModal(false);
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
    if (!NewTask.title) {
      alert("Task title is empty");
      return;
    }
    // --------- create new task
    const dataSent = await createNewTodoAPI({
      ...NewTask,
      title: NewTask.title.trim(),
    });
    // ---------- rerender page without refresh
    if (dataSent) {
      setAllTasks(dataSent.data);
    }
    const checkUpdateTaskOfMemberArr = AllMembers?.filter(
      (member) =>
        NewTask?.manager?.includes(member.name) &&
        !member.tasks?.includes(NewTask.title)
    )?.map((member) => {
      updateTasksOfMember(member);
    });
    // ------------------ اگر تسک را با موفقیت به منیجرهایش ادد کرد آنگاه تسک را میسازد
    // ---- اگر خطای آپدیت تسکها یممبر را دریافت کند اصلا تسک جدید ایجاد نمیشود
    if (checkUpdateTaskOfMemberArr?.find((item) => item === false)) {
      alert("error i update task of members");
      console.log("error i update task of members");
      deleteTask();
    } else {
      console.log("not found");
    }

    // --------------------------------- end update
    await createNewHistoryAPI({
      title: "Created",
      newTodo: { ...NewTask },
    });
    setNewTask({
      title: "",
      manager: [],
      complete: false,
      updatedOn: new Date(),
      createdOn: new Date(),
    });
    handleCloseModal();
  }
  // -------- delete task if updateTaskOfMember has error
  async function deleteTask() {
    console.log("first");
    // const dataSentDeleteTodo = await deleteOneTodoAPI(NewTask._id);
    // if (dataSentDeleteTodo) {
    //   setAllTasks(dataSentDeleteTodo.data);
    // }
  }
  // ------------- آپدیت تسک ممبرها و دریافت همه ی ممبرها بعد از آپدیت
  // و ست کردن ممبر ها برای نمایش درست در پیج ممبرز
  async function updateTasksOfMember(member) {
    const dataSent = await updateOneMemberAPI(member._id, {
      ...member,
      tasks: [...member.tasks, NewTask.title],
    });
    if (dataSent) {
      setAllMembers(dataSent.data);
      return true;
    }
    return false;
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
                  title: e.target.value,
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
                        manager: [...NewTask.manager, e.target.value],
                      });
                    } else {
                      //--------------- delete manager that checked is false
                      const newTaskManagerArr = NewTask.manager?.filter(
                        (manage) => !(manage === e.target.value)
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
