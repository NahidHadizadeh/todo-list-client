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
  // const [isChecked,setIsChecked]=useState(false)
  const navigate = useNavigate();
  const [UpdateTodo, setUpdateTodo] = useState(TodoForEdit);
  // useEffect(() => {
  //   setUpdateTodo(TodoForEdit);
  // }, [TodoForEdit]);

  // //// close modal
  // ///// update member data base for tasks
  useEffect(() => {
    // if (UpdateTodo !== TodoForEdit && UpdateTodo._id) {

    UpdateTodo.manager?.map((manage) => {
      AllMembers.map((member) => {
        if (member.name === manage) {
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

          <Form.Group className="check-box">
            <Form.Label>manager:</Form.Label>
            {AllMembers?.map((member, index) => {
              return (
                <>
                  <Form.Check
                    // checked={TodoForEdit.manager?.map((manage) =>
                    //   manage === member.name ? true : false
                    // )}
                    key={index + "custom-check"}
                    type="switch"
                    id={"custom-switch"}
                    label={member.name}
                    // value={
                    // }
                    // checked={isChecked}
                    // checked={isChecked}
                    onChange={(e) => {
                      // UpdateTodo.manager?.includes(member.name)
                      // ? setIsChecked(true)
                      // : setIsChecked(false);
                      // setIsChecked((prev)=>!prev)
                      console.log(e.target.checked);
                      // e.target.checked = !e.target.checked;
                      if (e.target.checked) {
                        if (
                          UpdateTodo.manager.indexOf(
                            member.name?.trim().toLowerCase()
                          ) === -1
                        ) {
                          setUpdateTodo({
                            ...UpdateTodo,
                            manager: [
                              ...UpdateTodo.manager,
                              member.name?.trim().toLowerCase(),
                            ],
                          });
                        } else {
                          const arrManager = [...UpdateTodo.manager];
                          arrManager.splice(
                            arrManager.indexOf(
                              member.name?.trim().toLowerCase()
                            ),
                            1
                          );
                          setUpdateTodo({
                            ...UpdateTodo,
                            manager: [...arrManager],
                          });
                          // alert("this manager is exit,select again");
                        }
                        // e.target.checked = false;
                      }
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

          <Form.Group className="mb-3" controlId="ageForm.ControlInput1">
            {/* <Form.Select
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
            </Form.Select> */}
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
