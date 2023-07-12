import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import useAddButton from "../../hooks/AddButton/useAddButton";
import "./addMember.css";
import UploadFile from "../UploadFile/UploadFile";
import { useState } from "react";
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
    imageFile: "",
    tasks: [],
    bgColor: 1,
    admin: false,
  });
  const [countSkills, setCountSkills] = useState(0);

  // handleSelectLanguage
  function handleSelectLanguage(e) {
    if (e.target.checked) {
      setNewMember({
        ...NewMember,
        language: [...NewMember.language, `${e.target.value}`],
      });
    }
  }
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
        skills: [...NewMember.skills, { newSkill }],
      });
    } else {
      console.log("please inter title of skill");
    }
    const showSkillElem = document.querySelector(".showSkill");
    showSkillElem.innerHTML += ` <span className="titleSkill">${newSkill}  </span>`;
    document.querySelector(".skillInput").value = "";
    // ------------------------------------ add number random(1-8) for bg color icon in home page

    setNewMember({ ...NewMember, bgColor: Math.floor(Math.random() * 7) + 1 });
    // ------------------------------------- end add bg color
  }

  async function handleCloseModal() {
    data.setShowModal(false);
    navigate("/members");
  }
  // handel submit form
  async function handleSubmit(e) {
    e.preventDefault();
    // validation skills
    if (countSkills < 2) {
      alert("enter more skills Please");
      console.log("enter more skills Please");
      return;
    }
    //// close modal
    handleCloseModal();
    //// create new todo API
    await createNewMemberAPI(NewMember);
    ///// change url
    navigate(0);
  }

  return (
    <Modal show={ShowModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Member Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Control
              type="email"
              placeholder="Enter email address"
              onChange={(e) =>
                setNewMember({ ...NewMember, email: e.target.value?.trim() })
              }
            />
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
              />
              <button
                className="btn btn-success submitSkill"
                onClick={handleSubmitSkills}
              >
                submit
              </button>
            </div>
            <Form.Text className="text-muted showSkill"></Form.Text>
          </Form.Group>
          <AdminChecked handleAdmin={handleAdmin} />
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
