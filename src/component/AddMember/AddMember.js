import { useNavigate } from "react-router-dom";
// import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import { createNewTodoAPI } from "../../API/todoListAPI";
// import { AddBtnContext } from "../../context/addButton/AddButtonContext";
import useAddButton from "../../hooks/AddButton/useAddButton";
import "./addMember.css";
import UploadFile from "../UploadFile/UploadFile";
import { useEffect, useState } from "react";
import { createNewMemberAPI } from "../../API/membersAPI";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import AdminChecked from "../AdminCheck/AdminChecked";

function AddMember({ ShowModal }) {
  const data = useAddButton();
  const AllMembers = useAllMembers().AllMembers;

  const navigate = useNavigate();
  const [NewMember, setNewMember] = useState({
    name: "",
    age: 0,
    github: "",
    email: "",
    skills: [],
    language: [],
    imageFile: {},
    tasks: [],
    admin: false,
  });
  const [countSkills, setCountSkills] = useState(0);
  // const [NewSkill, setNewSkill] = useState("");
  // useEffect(() => {
  //   setNewMember({ ...NewMember, skills: [...NewMember.skills, NewSkill] });
  // }, NewSkill);
  //

  // /////admin disable handler
  // useEffect(() => {
  // }, []);

  // adminChecked();
  // handleSelectLanguage
  function handleSelectLanguage(e) {
    if (e.target.checked) {
      setNewMember({
        ...NewMember,
        language: [...NewMember.language, `${e.target.value}`],
      });
    }
  }
  // //handel admin
  function handleAdmin(e) {
    e.target.checked
      ? setNewMember({
          ...NewMember,
          admin: true,
        })
      : setNewMember({
          ...NewMember,
          admin: false,
        });
  }
  // handel submit skills
  function handleSubmitSkills(e) {
    setCountSkills(countSkills + 1);
    e.preventDefault();
    const newSkill = document.querySelector(".skillInput").value?.trim();
    if (newSkill !== "") {
      setNewMember({
        ...NewMember,
        skills: [...NewMember.skills, newSkill],
      });
    } else {
      console.log("please inter title of skill");
    }
    const showSkillElem = document.querySelector(".showSkill");
    showSkillElem.innerHTML += ` <span className="titleSkill">${newSkill}  </span>`;
    document.querySelector(".skillInput").value = "";
    // setSkills([...skills, newSkill]);
  }

  function handleCloseModal() {
    data.setShowModal(false);
    navigate("/members");
  }
  // handel submit form
  function handleSubmit(e) {
    e.preventDefault();
    // validation skills
    if (countSkills < 2) {
      alert("enter more skills Please");
      console.log("enter more skills Please");
      return;
    }
    //// close modal
    handleCloseModal();
    // data.
    //// create new todo API
    createNewMemberAPI(NewMember);
    ///// change url
    // navigate("/members");
    // refresh page for display all todos
    navigate(0);

    // setNewTodoTitle({ title: "" });
    // change url
  }

  return (
    <Modal show={ShowModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Member Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Name:</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="enter your name"
              autoFocus
              onChange={(e) =>
                setNewMember({
                  ...NewMember,
                  name: e.target.value?.trim().toLowerCase(),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ageForm.ControlInput1">
            {/* <Form.Label>Age:</Form.Label> */}
            <Form.Control
              type="number"
              placeholder="enter your age"
              autoFocus
              onChange={(e) =>
                setNewMember({ ...NewMember, age: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicGithub">
            {/* <Form.Label>Github address</Form.Label> */}
            <Form.Control
              type="string"
              placeholder="Enter github address"
              onChange={(e) =>
                setNewMember({
                  ...NewMember,
                  github: e.target.value?.trim(),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLinkedin">
            {/* <Form.Label>LinkedIn address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter email address"
              onChange={(e) =>
                setNewMember({ ...NewMember, email: e.target.value?.trim() })
              }
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language : </Form.Label>
            <Form.Check
              type="checkbox"
              label="English"
              value="English"
              name="English"
              onChange={(e) => {
                handleSelectLanguage(e);
              }}
            />
            <Form.Check
              type="checkbox"
              label="Arabic"
              value="Arabic"
              name="Arabic"
              onChange={(e) => {
                handleSelectLanguage(e);
              }}
            />
            <Form.Check
              type="checkbox"
              label="Persian"
              value="Persian"
              name="Persian"
              onChange={(e) => {
                handleSelectLanguage(e);
              }}
            />
          </Form.Group>
          <UploadFile setNewMember={setNewMember} NewMember={NewMember} />
          <Form.Group className="mb-3" controlId="formBasicSkills">
            <Form.Label>Skills</Form.Label>
            <div className="skillsBox d-flex">
              <Form.Control
                className="skillInput"
                type="text"
                placeholder="Enter skills and submited"
                // onchange={(e) => setNewSkill(e.target.value)}
              />
              <button
                className="btn btn-success submitSkill"
                onClick={handleSubmitSkills}
              >
                submit
              </button>
            </div>
            <Form.Text className="text-muted showSkill">
              {/* {skills?.map((skill, index) => {
                return <label key={index}>{skill}</label>;
              })} */}
            </Form.Text>
          </Form.Group>
          <AdminChecked handleAdmin={handleAdmin} />
          {/* <Form.Group className="mb-3">
            <Form.Label>Admin</Form.Label>
            <Form.Check
              type="checkbox"
              label="Admin"
              name="Admin"
              className="adminCheck"
              onChange={(e) => {
                handleAdmin(e);
                // e.target.value
                // setNewMember({ ...NewMember, admin: e.target.value });
                // : setNewMember({ ...NewMember, admin: "no" });
              }}
            />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMember;
