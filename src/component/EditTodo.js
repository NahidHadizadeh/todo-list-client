import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateOneTodoAPI } from "../API/todoListAPI";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewHistoryAPI } from "../API/historyAPI";

function EditTodo({ ShowModal, TodoForEdit, handleCloseModal }) {
  const AllMembers = useAllMembers().AllMembers;
  const AllTasks = useAllTasks().AllTasks;
  // const AllChange = useAllChanging();
  const [isChecked, setIsChecked] = useState([]);
  const navigate = useNavigate();
  const [UpdateTodo, setUpdateTodo] = useState({ ...TodoForEdit });

  // --------------- ترو کردن چک باکس مربوط به منیجرهای یک تسک
  useEffect(() => {
    setIsChecked(
      AllMembers.map((member) => {
        console.log(TodoForEdit?.manager);
        if (TodoForEdit?.manager?.includes(member.name)) {
          console.log(member.name);
          return true;
        } else return false;
      })
    );
  }, [TodoForEdit]);
  // ------------------------------- پایان

  // setIsChecked(
  //   AllMembers.map((member) => {
  //     if (TodoForEdit?.manager?.inclueds(member.name)) return true;
  //     else return false;
  //   })
  // );
  // //// close modal
  // ///// update member data base for tasks
  useEffect(() => {
    // if (UpdateTodo !== TodoForEdit && UpdateTodo._id) {

    UpdateTodo.manager?.map((manage) => {
      AllMembers.map((member) => {
        if (
          member.name === manage &&
          !member.tasks.includes(UpdateTodo.title)
        ) {
          updateOneMemberAPI(member._id, {
            ...member,
            tasks: [...member.tasks, UpdateTodo.title],
          });
        }
      });
    });

    // AllMembers.map((member) => {
    //   if (member.name === UpdateTodo.manager) {
    //     updateOneMemberAPI(member._id, {
    //       ...member,
    //       tasks: [...member.tasks, UpdateTodo.title],
    //     });
    //   } else {
    //     console.log(member.tasks.filter((task) => task !== UpdateTodo.title));
    //     updateOneMemberAPI(member._id, {
    //       ...member,
    //       tasks: member.tasks.filter((task) => task !== UpdateTodo.title),
    //     });
    //   }
    // });
    // }
  }, [UpdateTodo]);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    setUpdateTodo({
      ...TodoForEdit,
      manager: [...arr],
    });
  }, [arr]);

  // handel submit form
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(UpdateTodo);
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
    // setUpdateTodo({ ...UpdateTodo, updateOn: new Date() });

    await updateOneTodoAPI(TodoForEdit._id, UpdateTodo);

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

  function handleIsChecked(index) {
    const changeIsChecked = [...isChecked];
    changeIsChecked[index] = !changeIsChecked[index];
    setIsChecked(changeIsChecked);
    AllMembers.map((member, index) => {
      // const arr = [];
      if (
        changeIsChecked[index] ||
        TodoForEdit.manager?.includes(member.name)
      ) {
        alert(member.name);
        setArr([...arr, member.name]);
      }
    });
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
                setUpdateTodo({ ...TodoForEdit, title: e.target.value })
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
              console.log(isChecked[index]);
              return (
                <>
                  <Form.Check
                    checked={isChecked[index]}
                    key={index + "custom-check"}
                    type="switch"
                    label={member.name}
                    value={member.name.trim().toLowerCase()}
                    onChange={(e) => {
                      handleIsChecked(index, e);

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
