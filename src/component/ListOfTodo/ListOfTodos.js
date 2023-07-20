import { Col, Spinner } from "react-bootstrap";
import "./listOfTodo.css";
import MemberIconComponent from "../MemberIconComponent";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import useAllTasks from "../../hooks/AllTasks/useAllTasks";
import useAllHistory from "../../hooks/AllHistory/useAllHistory";
import { AiOutlineDelete } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { createNewHistoryAPI } from "../../API/historyAPI";
import { updateOneMemberAPI } from "../../API/membersAPI";
import { deleteOneTodoAPI, updateOneTodoAPI } from "../../API/todoListAPI";
import EditTodo from "../EditTodo";

export default function ListOfTodos() {
  const { AllMembers, setAllMembers } = useAllMembers();
  const { AllTasks, setAllTasks } = useAllTasks();
  const setAllHistory = useAllHistory().setAllHistory;

  async function handleComplete(task) {
    const dataSent = await updateOneTodoAPI(task._id, {
      ...task,
      complete: task.complete ? false : true,
      updatedOn: new Date(),
    });
    //------------ get allTask agin for rerender
    // --------- برای اینکه صفحه را رفرش نکنم و با ادیت تسک صفحه ری رندر بشه
    if (dataSent) {
      setAllTasks(dataSent.data);
    }
    const dataSentHistory = createNewHistoryAPI({
      title: task?.complete ? "Don't Complete" : "Completed",
      newTodo: { ...task },
    });
    if (dataSentHistory) {
      setAllHistory(dataSentHistory.data);
    }
  }

  async function handleDelete(task) {
    // ------ delete task
    const dataSent = await deleteOneTodoAPI(task._id);
    // --------- برای اینکه صفحه را رفرش نکنم و با ادیت تسک صفحه ری رندر بشه
    if (dataSent) {
      setAllTasks(dataSent.data);
    }
    // ------ edit task's member after delete task
    AllMembers?.filter((mem) => task.manager?.includes(mem.name))?.map(
      (member) => {
        updateTasksOfMember(member, task);
      }
    );
    //create history for delete tasks
    const dataSentHistory = await createNewHistoryAPI({
      title: "Deleted",
      newTodo: { ...task },
    });
    if (dataSentHistory) {
      setAllHistory(dataSentHistory.data);
    }
  }
  // ------------- آپدیت تسک ممبرها و دریافت همه ی ممبرها بعد از آپدیت
  // و ست کردن ممبر ها برای نمایش درست در پیج ممبرز
  async function updateTasksOfMember(member, task) {
    const dataSent = await updateOneMemberAPI(member._id, {
      ...member,
      tasks: member.tasks.filter((tas) => tas !== task.title),
    });
    if (dataSent) {
      setAllMembers(dataSent.data);
    }
  }

  return (
    <section>
      <div className="main-row">
        {/* sm={12} md={6} lg={4} xl={4} */}
        <Col className="columns-todo col-12">
          {AllTasks?.length > 0 ? (
            AllTasks?.map((task, index) => {
              return (
                <div key={index + "tasks"} className="todo-box">
                  <div className="line1-todo">
                    <span
                      className={
                        task.complete ? "taskBox greenText" : "taskBox"
                      }
                    >
                      {task.title}
                    </span>
                    <div>
                      {/* ------------ edit btn component */}
                      <EditTodo TodoForEdit={task} />

                      <button
                        className="btn btn-danger "
                        onClick={() => handleDelete(task)}
                      >
                        <AiOutlineDelete />
                      </button>
                      <button
                        className="btn btn-success "
                        onClick={() => {
                          handleComplete(task);
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
            })
          ) : AllTasks?.length === 0 ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            "Notting"
          )}
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
