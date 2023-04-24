import { Route, Routes } from "react-router-dom";
import CreateTodo from "./component/CreateTodo";
import EditTodo from "./component/EditTodo";
import History from "./pages/History";
import Members from "./pages/Members";
import Home from "./pages/Home";
import AddMember from "./component/AddMember/AddMember";
import AddButtonProvider from "./context/AddButtonContext";
import NotFoundPage from "./pages/NotFound";
import AllMembersProvider from "./context/MembersContext";
import AllTasksProvider from "./context/TasksContext";
import SearchNameProvider from "./context/SearchMember";
import AllChangingProvider from "./context/HistoryContext";

function App() {
  return (
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
                <Route path="/history" element={<History />} />
                <Route path="/members/" element={<Members />}>
                  <Route
                    path="addMember"
                    element={
                      <AddMember
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
  );
}

export default App;
