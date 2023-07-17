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
  const setAllMembers = useAllMembers().setAllMembers;

  const [NewMember, setNewMember] = useState({
    name: "",
    age: 0,
    github: "",
    email: "",
    language: [],
    imageFile: "",
    tasks: [],
    skills: [],
    bgColor: Math.floor(Math.random() * 7) + 1,
    admin: false,
  });
  const [countSkills, setCountSkills] = useState(0);
  const [NewSkill, setNewSkill] = useState("");

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

  async function handleCloseModal() {
    data.setShowModal(false);
  }
  // handel submit form
  async function handleSubmit(e) {
    e.preventDefault();
    //---------  validation skills
    if (NewMember.name.length > 30 || NewMember.name.length < 3) {
      alert("name is not valide (max 50 char , min 3 char)");
      console.log("name is not valide (max 50 char , min 3 char)");
      return;
    }
    if (NewMember.age > 60 || NewMember.age < 15 || !NewMember.age) {
      alert("age is not valide ( 15<age<60 )");
      console.log("age is not valide ( 15<age<60 )");
      return;
    }

    if (
      !NewMember.github.includes("https://github.com/") ||
      !NewMember.github ||
      NewMember.github?.length > 50
    ) {
      alert("github is not valide and max 50 char");
      console.log("github is not valide and max 50 char");
      return;
    }

    if (
      (!NewMember.email.includes("@") && !NewMember.email.includes(".")) ||
      !NewMember.email
    ) {
      alert("email is not valide");
      console.log("email is not valide");
      return;
    }
    if (NewMember.language?.length === 0) {
      alert("select language");
      console.log("select language");
      return;
    }
    if (countSkills < 2) {
      alert("enter more skills Please");
      console.log("enter more skills Please");
      return;
    }
    // -------- end validate
    handleCloseModal();

    const dataSent = await createNewMemberAPI(NewMember);
    if (dataSent) {
      setAllMembers(dataSent.data);
    }
    setNewMember({
      name: "",
      age: 0,
      github: "",
      email: "",
      language: [],
      imageFile: "",
      tasks: [],
      skills: [],
      bgColor: Math.floor(Math.random() * 7) + 1,
      admin: false,
    });
    handleCloseModal();
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
                  name: e.target.value?.trim(),
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
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewSkill(e.target.value);
                  }
                }}
              />
              <button
                className="btn btn-success submitSkill"
                onClick={(e) => {
                  if (
                    NewSkill !== "" &&
                    !NewMember.skills?.includes(NewSkill)
                  ) {
                    setCountSkills(countSkills + 1);
                    setNewMember({
                      ...NewMember,
                      skills: [...NewMember.skills, NewSkill],
                    });
                    document.querySelector(".skillInput").value = "";
                    const showSkillElem = document.querySelector(".showSkill");

                    showSkillElem.innerHTML += `
                    <span className="titleSkill">   -   ${NewSkill} </span>`;
                    document.querySelector(".skillInput").value = "";
                  } else {
                    alert("please inter new skill");
                  }
                  e.preventDefault();
                }}
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
