import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateOneTodoAPI } from "../API/todoListAPI";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewHistoryAPI } from "../API/historyAPI";

function EditTodo({ ShowModal, TodoForEdit, handleCloseModal }) {
  const AllMembers = useAllMembers().AllMembers;
  const [isChecked, setIsChecked] = useState([]);
  const navigate = useNavigate();
  const [UpdateTodo, setUpdateTodo] = useState();

  // --------------- ترو کردن چک باکس مربوط به منیجرهای یک تسک
  useEffect(() => {
    setIsChecked(
      AllMembers.map((member) => {
        if (TodoForEdit?.manager?.includes(member.name)) {
          console.log(member.name);
          return true;
        } else return false;
      })
    );
    setUpdateTodo({ ...TodoForEdit });
  }, [TodoForEdit]);
  // ------------------------------- پایان

  function handleIsChecked(index, member) {
    const changeIsChecked = [...isChecked];
    changeIsChecked[index] = !changeIsChecked[index];
    setIsChecked(changeIsChecked);
    // -------------------- add member that checked's member is true
    if (changeIsChecked[index] && !member.tasks?.includes(UpdateTodo.title)) {
      setUpdateTodo({
        ...UpdateTodo,
        manager: [...UpdateTodo.manager, member.name],
      });
      // -------------------- and remove member that checked's member is false
    } else if (
      !changeIsChecked[index] &&
      member.tasks?.includes(UpdateTodo.title)
    ) {
      let filterManagerArr = UpdateTodo.manager?.filter(
        (manage) => manage !== member.name
      );
      console.log(filterManagerArr);
      setUpdateTodo({ ...UpdateTodo, manager: [...filterManagerArr] });
    }
  }

  // handel submit form
  async function handleSubmit(e) {
    console.log(UpdateTodo);
    e.preventDefault();
    // validatin title
    if (TodoForEdit.title === "select task" || TodoForEdit.title === "") {
      alert("this task is exist,select other task");
      return;
    }
    // if(UpdateTodo.title===)
    if (UpdateTodo.manager?.length === 0) {
      alert("select manager");
      return;
    }
    // close modal
    handleCloseModal();
    // setUpdateTodo({ ...UpdateTodo, updateOn: new Date() });

    await updateOneTodoAPI(TodoForEdit._id, UpdateTodo);

    AllMembers?.map((member) => {
      if (
        UpdateTodo.manager?.includes(member.name) &&
        !member.tasks?.includes(UpdateTodo.title)
      ) {
        alert(member.name);
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

    // ////create history for edit tasks
    await createNewHistoryAPI({
      title: "edited",
      newTodo: { ...UpdateTodo },
      todoForEdit: { ...TodoForEdit },
    });

    // setArr([]);
    // change url
    navigate(0);
    navigate("/");

    // set initioal value for todo
    // setUpdateTodo({});
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
                    value={member.name.trim().toLowerCase()}
                    onChange={(e) => {
                      handleIsChecked(index, member);

                      //   // else if (
                      //   //   !UpdateTodo?.manager?.includes(e.target.value)
                      //   // ) {
                      //   //   alert("update shamle valu nis");
                      //   //   setUpdateTodo({
                      //   //     ...TodoForEdit,
                      //   //     manager: [...TodoForEdit.manager, e.target.value],
                      //   //   });
                      //   // }
                    }}
                  />
                  {/* // ------------------------------- */}
                  {/* {AllMembers.map(member=>{
                  return (
                  <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                  <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
                </div>)
                })} */}
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
  );
}

export default EditTodo;
