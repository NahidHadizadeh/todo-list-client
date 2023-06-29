import NavbarProject from "../component/Navbar";
import TableProj from "../component/TableProj";
import AddButton from "../component/AddButton";
import CreateTask from "../component/CreateTodo";
import useAddButton from "../hooks/AddButton/useAddButton";
import useAllTasks from "../hooks/AllTasks/useAllTasks";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
// import { FaUserCircle } from "react-icons/fa";
import MembersIcon from "../component/MembersIcon";
// import ListOfTodos from "../component/ListOfTodo/ListOfTodos";
import ListOfTodos from "../component/ListOfTodo/ListOfTodos";

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
              {AllMembers.map((member, index) => {
                if (member.admin)
                  return (
                    <div
                      key={"admin" + index}
                      className="displayImage adminImage"
                    >
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                  );
              })}
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
