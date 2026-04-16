import { Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { CreatePostContext } from "../../context/createPost/createPostContext";
import {
  BoxTextInput,
  CreatePostTitle,
  LoadPhotoStack,
  ModalStack,
  PostPhoto,
  PostTextInput,
  TitleStack,
} from "./styles";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { fetchUser } from "../../redux/slices/userSlice";

function CreatePost() {
  const { openCreate, toggleCreate, toggleCreateParent } =
    useContext(CreatePostContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  };

  const currentUser = getToken();

  const converToBase64 = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;

      console.log(result);
      setBase64(result);
    };

    reader.onerror = (error) => {
      console.error(error);
    };
  };

  const handleFile = (file) => {
    if (!file) return console.error("This is not file");

    const url = URL.createObjectURL(file);
    setImage(url);

    converToBase64(file);
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    console.log(file);
    handleFile(file);
  };

  const fileDelete = () => {
    setImage(null);
  };

  const postCreate = () => {
    if (!base64) return console.error("Photo not defined!");

    dispatch(createPost({ photo: base64, text })).then(() => {
      setImage(null);
      setText("");
      setBase64("");
      toggleCreate();
      dispatch(fetchUser(currentUser.id));
    });
  };

  return (
    <Modal open={openCreate}>
      <Stack
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={toggleCreateParent}
      >
        <ModalStack>
          <TitleStack>
            <CreatePostTitle variant="h6">Create new post</CreatePostTitle>
            <Button
              onClick={postCreate}
              sx={{ position: "absolute", right: 0, padding: "13px 10px" }}
              size="large"
            >
              Share
            </Button>
          </TitleStack>
          <Grid container wrap="nowrap">
            <Grid item xs={8}>
              {!image ? (
                <LoadPhotoStack
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={fileChange}
                  />
                  <CloudUploadOutlinedIcon
                    sx={{ fontSize: 80, fontWeight: 300, color: "#b8b8b8" }}
                  />
                </LoadPhotoStack>
              ) : (
                <Stack width={"550px"} height={"550px"} position={"relative"}>
                  <PostPhoto src={image} />
                  <CloseIcon
                    onClick={fileDelete}
                    sx={{
                      position: "absolute",
                      padding: 0,
                      fontSize: 35,
                      cursor: "pointer",
                      color: "#b8b8b8",
                    }}
                  />
                </Stack>
              )}
            </Grid>
            <Grid item xs={4}>
              <BoxTextInput>
                <PostTextInput
                  fullWidth
                  multiline
                  rows={9}
                  variant="outlined"
                  inputProps={{ maxLength: 300 }}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <Typography>{text.length}/300</Typography>
              </BoxTextInput>
            </Grid>
          </Grid>
        </ModalStack>
      </Stack>
    </Modal>
  );
}
export default CreatePost;
