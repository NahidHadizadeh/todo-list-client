import { createContext, useState } from "react";

export const AddBtnContext = createContext({
  ShowModal: false,
  setShowModal: () => {},
});

function AddButtonProvider({ children }) {
  console.log("add btn rovider");

  const [ShowModal, setShowModal] = useState(false);

  return (
    <AddBtnContext.Provider
      value={{
        ShowModal,
        setShowModal,
      }}
    >
      {children}
    </AddBtnContext.Provider>
  );
}
export default AddButtonProvider;
