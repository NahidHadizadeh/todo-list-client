import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateOneTodoAPI } from "../API/todoListAPI";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewHistoryAPI } from "../API/historyAPI";
import { AiOutlineEdit } from "react-icons/ai";
import useAllTasks from "../hooks/AllTasks/useAllTasks";

function EditTodo({ TodoForEdit }) {
  const AllMembers = useAllMembers().AllMembers;
  const AllTasks = useAllTasks().AllTasks;
  const [isChecked, setIsChecked] = useState([]);
  const navigate = useNavigate();
  const [UpdateTodo, setUpdateTodo] = useState();
  const [ShowModal, setShowModal] = useState(false);

  console.log(AllTasks);
  // --------------- ترو کردن چک باکس مربوط به منیجرهای یک تسک
  useEffect(() => {
    setIsChecked(
      AllMembers.map((member) => {
        if (TodoForEdit?.manager?.includes(member.name)) {
          return true;
        } else return false;
      })
    );
    setUpdateTodo({ ...TodoForEdit });
  }, [TodoForEdit]);
  // ------------------------------- پایان
  function handleCloseModal() {
    setShowModal(false);
    navigate("/");
  }

  function handleIsChecked(index, member) {
    const changeIsChecked = [...isChecked];
    changeIsChecked[index] = !changeIsChecked[index];
    setIsChecked(changeIsChecked);
    // -------------------- add member that checked's member is true

    if (changeIsChecked[index]) {
      setUpdateTodo({
        ...UpdateTodo,
        manager: [...UpdateTodo.manager, member.name],
      });
      // -------------------- and remove member that checked's member is false
    } else {
      let filterManagerArr = UpdateTodo.manager?.filter(
        (manage) => manage !== member.name
      );
      setUpdateTodo({ ...UpdateTodo, manager: [...filterManagerArr] });
    }
  }

  // handel submit form
  async function handleSubmit(e) {
    e.preventDefault();
    // validatin title
    if (UpdateTodo.title.trim() === "") {
      alert("task title is empty, please inter it");
      return;
    }
    if (UpdateTodo.manager?.length === 0) {
      alert("select manager");
      return;
    }
    if (
      AllTasks?.some(
        (task) =>
          task.title === UpdateTodo.title.trim() &&
          task.manager === UpdateTodo.manager
      )
    ) {
      alert("Change title or managers ,Please");
      return;
    }
    // close modal
    handleCloseModal();

    // ---------------------- trim title befor saved
    await updateOneTodoAPI(TodoForEdit._id, {
      ...UpdateTodo,
      title: UpdateTodo.title.trim(),
    });
    // ------------- update task of member api
    AllMembers?.map((member) => {
      if (
        UpdateTodo.manager?.includes(member.name) &&
        !member.tasks?.includes(UpdateTodo.title)
      ) {
        updateOneMemberAPI(member._id, {
          ...member,
          tasks: [...member.tasks, UpdateTodo.title],
        });
      } else if (
        !UpdateTodo.manager?.includes(member.name) &&
        member.tasks?.includes(UpdateTodo.title)
      ) {
        updateOneMemberAPI(member._id, {
          ...member,
          tasks: [...member.tasks?.filter((task) => task !== UpdateTodo.title)],
        });
      }
    });
    // ------------- end update task of member api

    // create history for edit tasks
    await createNewHistoryAPI({
      title: "edited",
      newTodo: { ...UpdateTodo },
      todoForEdit: { ...TodoForEdit },
    });

    // change url
    navigate(0);
    navigate("/");
  }

  return (
    <>
      {/* ------------ edit button  */}
      <button
        className="btn btn-warning "
        onClick={() => {
          setShowModal(true);
        }}
      >
        <AiOutlineEdit />
      </button>

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
                value={UpdateTodo?.title}
                onChange={(e) => {
                  setUpdateTodo({
                    ...UpdateTodo,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Group>
            {/* ----------------- display name of managers */}
            {TodoForEdit.manager?.map((manage) => {
              return <span className="m-1">{manage}</span>;
            })}

            <Form.Group className="check-box">
              <Form.Label>manager:</Form.Label>

              {AllMembers?.map((member, index) => {
                return (
                  <>
                    <Form.Check
                      checked={isChecked[index]}
                      key={index + "custom-check"}
                      type="switch"
                      label={member.name}
                      value={member.name}
                      onChange={(e) => {
                        handleIsChecked(index, member);
                      }}
                    />
                  </>
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTodo;
