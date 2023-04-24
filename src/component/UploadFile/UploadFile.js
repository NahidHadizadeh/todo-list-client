import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export const UploadFile = ({ setNewMember, NewMember }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setNewMember({ ...NewMember, imageFile: e.target.files[0] });
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  const handleUploadClick = (e) => {
    e.preventDefault();
    setNewMember({ ...NewMember, imageFile: { url: preview } });
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicImage">
      <Form.Label>image:</Form.Label>
      <div className="skillsBox d-flex">
        <Form.Control type="file" onChange={onSelectFile} />
        <button className="btn btn-success" onClick={handleUploadClick}>
          Upload
        </button>
        {selectedFile && <img className="ImageForm" src={preview} />}
      </div>
    </Form.Group>
  );
};

export default UploadFile;
