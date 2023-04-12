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
    console.log(e.target.files[0]);
    setNewMember({ ...NewMember, imageFile: e.target.files[0] });
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  const handleUploadClick = (e) => {
    e.preventDefault();
    console.log(selectedFile);
    setNewMember({ ...NewMember, imageFile: { url: preview } });
    console.log("upload");
  };

  return (
    // <div>
    //   <input type="file" onChange={onSelectFile} />
    //   {selectedFile && <img src={preview} />}
    // </div>
    <Form.Group className="mb-3" controlId="formBasicImage">
      <Form.Label>image:</Form.Label>
      <div className="skillsBox d-flex">
        <Form.Control type="file" onChange={onSelectFile} />
        {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
        <button onClick={handleUploadClick}>Upload</button>
        {selectedFile && <img className="ImageForm" src={preview} />}
      </div>
    </Form.Group>
  );
};

// function UploadFile() {
//   const [file, setFile] = useState();

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUploadClick = (e) => {
//     e.preventDefault();
//     if (!file) {
//       return;
//     }
//     console.log(file);
//     // return <img src={file} alt="image" />;
//     // // 👇 Uploading the file using the fetch API to the server
//     // fetch('https://httpbin.org/post', {
//     //   method: 'POST',
//     //   body: file,
//     //   // 👇 Set headers manually for single file upload
//     //   headers: {
//     //     'content-type': file.type,
//     //     'content-length': `${file.size}`, // 👈 Headers need to be a string
//     //   },
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => console.log(data))
//     //   .catch((err) => console.error(err));
//   };

//   return (
//     // <div>
//     //   <input type="file" onChange={handleFileChange} />

//     //   <div>{file && `${file.name} - ${file.type}`}</div>

//     //   <button onClick={handleUploadClick}>Upload</button>
//     // </div>
//     <Form.Group className="mb-3" controlId="formBasicImage">
//       <Form.Label>image:</Form.Label>
//       <div className="skillsBox d-flex">
//         <Form.Control type="file" onChange={handleFileChange} />
//         {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
//         <img src={file} alt="image" />;
//         <button onClick={handleUploadClick}>Upload</button>
//       </div>
//     </Form.Group>
//   );
// }

export default UploadFile;
