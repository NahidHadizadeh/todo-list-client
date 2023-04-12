// import AddTodo from "./component/Home";
import { Route, Routes } from "react-router-dom";
import CreateTodo from "./component/CreateTodo";
import EditTodo from "./component/EditTodo";
import History from "./pages/History";
import Members from "./pages/Members";
import Home from "./pages/Home";
// import NavbarProject from "./component/Navbar";
import AddMember from "./component/AddMember/AddMember";
import AddButtonProvider from "./context/AddButtonContext";
// import useAddButton from "./hooks/AddButton/useAddButton";
import NotFoundPage from "./pages/NotFound";
import AllMembersProvider from "./context/MembersContext";
import AllTasksProvider from "./context/TasksContext";
import SearchNameProvider from "./context/SearchMember";
import AllChangingProvider from "./context/HistoryContext";
// import AddTask from "./component/AddTask/AddTask";
// import AddTask  from "./"
function App() {
  // const data = useAddButton();
  return (
    // <>
    // {/* <NavbarProject /> */}
    // <AddButtonProvider></AddButtonProvider>
    <AllChangingProvider>
      <AddButtonProvider>
        <AllMembersProvider>
          <AllTasksProvider>
            <SearchNameProvider>
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="createTask" element={<CreateTodo />}></Route>;
                  <Route path="edit" element={<EditTodo />}></Route>;
                </Route>
                {/* ;<Route path="/home" element={<Home />} /> */}
                <Route path="/history" element={<History />} />
                <Route path="/members/" element={<Members />}>
                  <Route
                    path="addMember"
                    element={
                      <AddMember
                      // ShowModal={data.ShowModal}
                      // handleCloseModal={()=>{data.setShowModal(false)}}
                      />
                    }
                  />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </SearchNameProvider>
          </AllTasksProvider>
        </AllMembersProvider>
      </AddButtonProvider>
    </AllChangingProvider>
    // </>
  );
}

export default App;
