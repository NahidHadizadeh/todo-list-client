import { useState } from "react";
import { Form } from "react-bootstrap";

export const UploadFile = ({ setNewMember, NewMember }) => {
  const [imagePreview, setImagePreview] = useState("");

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleProfileImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImagePreview(base64);
    setNewMember({ ...NewMember, imageFile: base64 });
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicImage">
      <Form.Label>image:</Form.Label>
      <div className="skillsBox d-flex">
        <Form.Control type="file" onChange={handleProfileImage} />
      </div>
    </Form.Group>
  );
};

export default UploadFile;
