import { useState } from "react";
import { CreatePostContext } from "./createPostContext";

function CreatePostProvider({ children }) {
  const [openCreate, setOpenCreate] = useState(false);

  const toggleCreateParent = (e) => {
    if (e.target === e.currentTarget) {
      setOpenCreate((prev) => !prev);
    }
  };

  const toggleCreate = () => {
    setOpenCreate((prev) => !prev);
  };

  const value = {
    openCreate,
    toggleCreate,
    toggleCreateParent,
  };

  return (
    <CreatePostContext.Provider value={value}>
      {children}
    </CreatePostContext.Provider>
  );
}

export default CreatePostProvider;
