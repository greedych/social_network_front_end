import { useState } from "react";
import { PostContext } from "./postContext";

function PostProvider({ children }) {
  const [openPost, setOpenPost] = useState(false);

  const togglePostParent = (e) => {
    if (e.target === e.currentTarget) {
      setOpenPost((prev) => !prev);
    }
  };

  const togglePost = () => {
    setOpenPost((prev) => !prev);
  };

  const value = {
    openPost,
    togglePost,
    togglePostParent,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export default PostProvider;
