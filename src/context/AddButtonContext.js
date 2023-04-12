import { createContext, useState } from "react";

export const AddBtnContext = createContext({
  ShowModal: false,
  setShowModal: () => {},
});

function AddButtonProvider({ children }) {
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
