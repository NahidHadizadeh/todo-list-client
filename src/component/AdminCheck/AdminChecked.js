import { useState } from "react";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import { Form } from "react-bootstrap";

function AdminChecked({handleAdmin}) {
  const AllMembers = useAllMembers().AllMembers;
  //   const [checkAdmin,setCheckAdmin]=useState()
  //   AllMembers?.map((member) => {
  //     console.log("checked");

  //     return member.admin === true
  //       ? `<Form.Group className="mb-3">
  //             <Form.Label>Admin</Form.Label>
  //             <Form.Check
  //             disabled
  //               type="checkbox"
  //               label="Admin"
  //               name="Admin"
  //               className="adminCheck"
  //               onChange={(e) => {
  //                 handleAdmin(e);
  //                 // e.target.value
  //                 // setNewMember({ ...NewMember, admin: e.target.value });
  //                 // : setNewMember({ ...NewMember, admin: "no" });
  //               }}
  //             />
  //           </Form.Group>`
  //       : `<Form.Group className="mb-3">
  //             <Form.Label>Admin</Form.Label>
  //             <Form.Check
  //               type="checkbox"
  //               label="Admin"
  //               name="Admin"
  //               className="adminCheck"
  //               onChange={(e) => {
  //                 handleAdmin(e);
  //                 // e.target.value
  //                 // setNewMember({ ...NewMember, admin: e.target.value });
  //                 // : setNewMember({ ...NewMember, admin: "no" });
  //               }}
  //             />
  //           </Form.Group>`;

  return AllMembers?.find((member) => member.admin === true) ? (

    <Form.Group className="mb-3">
      <Form.Label>Admin</Form.Label>
      <Form.Check
        disabled
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
    </Form.Group>
  ) : (
    <Form.Group className="mb-3">
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
    </Form.Group>
  );
  //   });
}
export default AdminChecked;
