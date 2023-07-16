import NavbarProject from "../component/Navbar";
// import TableProj from "../component/TableProj";
import AddButton from "../component/AddButton";
import CreateTask from "../component/CreateTodo";
import useAddButton from "../hooks/AddButton/useAddButton";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import MembersIcon from "../component/MembersIcon";
import ListOfTodos from "../component/ListOfTodo/ListOfTodos";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const dataBtn = useAddButton();
  const AllTasks = useAllTasks().AllTasks;
  const AllMembers = useAllMembers().AllMembers;

  return (
    <>
      <NavbarProject />
      <div className="container sectionbox">
        <CreateTask ShowModal={dataBtn.ShowModal} />
        <section className="d-flex align-items-center">
          <span>Members: </span>
          <div>
            <div className="listOfMembers">
              {AllMembers ? (
                AllMembers?.filter((member) => member.admin)?.map(
                  (member, index) => {
                    return (
                      <div
                        key={"admin" + index}
                        className={"displayImage adminImage bgColor".concat(
                          member.bgColor
                        )}
                      >
                        {member.imageFile ? (
                          <img
                            className="img-member"
                            alt="admin "
                            src={member.imageFile}
                          />
                        ) : (
                          member.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                    );
                  }
                )
              ) : (
                <Spinner animation="border" variant="secondary" />
              )}
            </div>
          </div>
          {/* ------------------------------------------ showe list of member */}
          <MembersIcon />
        </section>
        <h3>Todo List</h3>
        <div className="newTaskAndTotalBox">
          <AddButton BtnText="Add New Task" />
          <label id="totalTasks" className="">
            total tasks : {AllTasks.length}
          </label>
        </div>
        {/* -------------------------- used "TableProj" component */}
        {/* <TableProj /> */}
        {/* -------------------------- use"ListOfTodos" component */}
        <ListOfTodos />
      </div>
    </>
  );
}
export default Home;
