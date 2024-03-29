import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateOneTodoAPI } from "../API/todoListAPI";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import { updateOneMemberAPI } from "../API/membersAPI";
import { createNewHistoryAPI } from "../API/historyAPI";
import { AiOutlineEdit } from "react-icons/ai";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import useAllHistory from "../hooks/AllHistory/useAllHistory";

// ------گرفتن آلتسک و ست آل تسک از پرنت برای ری رندر شدن است تا نیاز به رقرش صفحه نداشته باشیم
function EditTodo({ TodoForEdit }) {
  const { AllMembers, setAllMembers } = useAllMembers();
  const { AllTasks, setAllTasks } = useAllTasks();
  const setAllHistory = useAllHistory().setAllHistory;
  const [isChecked, setIsChecked] = useState([]);
  const [UpdateTodo, setUpdateTodo] = useState();
  const [ShowModal, setShowModal] = useState(false);

  // --------------- ترو کردن چک باکس مربوط به منیجرهای یک تسک
  const setIsCkeckedFunc = () => {
    setIsChecked(
      AllMembers.map((member) => {
        if (TodoForEdit?.manager?.includes(member.name)) {
          return true;
        } else return false;
      })
    );
    setUpdateTodo({ ...TodoForEdit });
  };

  // ------------------------------- پایان
  function handleCloseModal() {
    setShowModal(false);
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
    const dataSent = await updateOneTodoAPI(TodoForEdit._id, {
      ...UpdateTodo,
      title: UpdateTodo.title.trim(),
    });
    // ------ for rerender page without refresh it
    if (dataSent.data) {
      setAllTasks(dataSent.data);
    }
    // ------------- update task of member api

    AllMembers?.map((member) => {
      updateMemberTasks(member);
    });
    // ------------- end update task of member api

    // create history for edit tasks
    const dataSentHistory = await createNewHistoryAPI({
      title: "edited",
      newTodo: { ...UpdateTodo },
      todoForEdit: { ...TodoForEdit },
    });
    if (dataSentHistory) {
      setAllHistory(dataSentHistory.data);
    }
  }

  // ------------- آپدیت تسک ممبرها و دریافت همه ی ممبرها بعد از آپدیت
  // و ست کردن ممبر ها برای نمایش درست در پیج ممبرز
  async function updateMemberTasks(member) {
    // اگر ممبر تسک جدید شامل ممبر باشد
    if (UpdateTodo?.manager?.includes(member.name)) {
      // اگر ممبر شامل تاتیل تسک قبل از ادیت باشد
      if (member.tasks?.includes(TodoForEdit?.title)) {
        const dataSentForTitle = await updateOneMemberAPI(member._id, {
          ...member,
          // تایتل قدیمی حذف و تایتل جدید ادد میشود
          tasks: [
            ...member.tasks?.filter((task) => task !== TodoForEdit?.title),
            UpdateTodo.title,
          ],
        });
        if (dataSentForTitle) {
          setAllMembers(dataSentForTitle.data);
        }
        // اگر ممبر شامل تایتل تسک قبل از ادیت نباشد
      } else {
        const dataSentForTitle = await updateOneMemberAPI(member._id, {
          ...member,
          // تسک جدید ادد میشود
          tasks: [...member.tasks, UpdateTodo.title],
        });
        if (dataSentForTitle) {
          setAllMembers(dataSentForTitle.data);
        }
      }
      // اگر ممبر جزو منیجرهای تسک نباشد(یا از لیست ممبرها حذف شده باشد)
    } else {
      // وقتی ممبری از منیجرها حذف شده و تسک زا دارد ،پس تسک را از تسکهای ممبر حذف میکنیم
      if (member.tasks?.includes(TodoForEdit?.title)) {
        const dataSentForTitle = await updateOneMemberAPI(member._id, {
          ...member,
          // حذف تسک از ممبری که از لیست منسجرها حذف شده
          tasks: [
            ...member.tasks?.filter((task) => task !== TodoForEdit?.title),
          ],
        });
        if (dataSentForTitle) {
          setAllMembers(dataSentForTitle.data);
        }
      }
    }
  }
  return (
    <>
      {/* ------------ edit button  */}
      <button
        className="btn btn-warning "
        onClick={() => {
          setIsCkeckedFunc();
          setShowModal(true);
        }}
      >
        <AiOutlineEdit />
      </button>

      <Modal show={ShowModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
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

            <Form.Group className="check-box">
              <Form.Label className="fw-4">manager: </Form.Label>

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
