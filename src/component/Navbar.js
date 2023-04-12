import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
function NavbarProject() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "NavLink" : null)}
            >
              Home
            </NavLink>
            <NavLink
              to={"/history"}
              className={({ isActive }) => (isActive ? "NavLink" : null)}
            >
              History
            </NavLink>
            <NavLink
              to={"/members"}
              className={({ isActive }) => (isActive ? "NavLink" : null)}
            >
              Memebers
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarProject;
