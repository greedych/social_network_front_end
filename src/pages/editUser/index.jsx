import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUser } from "../../redux/slices/userSlice";
import { UserAvatar, UserEditForm } from "./styles";
import { useForm } from "react-hook-form";

function EditUser() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user,
  );
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (!payload.exp) return null;

      if (+payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  };
  const [token] = useState(() => getToken());
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(user.avatar);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        name: user.name,
        description: user.description,
      });
      // setBase64((prev) => prev || user.avatar);
    }
  }, [user, reset]);

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

  useEffect(() => {
    dispatch(fetchUser(token.id));
  }, [dispatch, token]);

  const onSubmit = async (data) => {
    try {
      if (base64 === "") {
        setBase64(user.avatar);
      }
      const result = await dispatch(
        editUser({
          avatar: base64,
          username: data.username,
          name: data.name,
          description: data.description,
        }),
      ).unwrap();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return <Typography>You don't registration!</Typography>;
  if (isLoading) return <Typography variant="h1">Loading...</Typography>;
  if (isError) return <Typography variant="h1">{message}</Typography>;

  return (
    <Stack width={"100%"} marginRight={"15%"} gap={5}>
      <Typography variant="h6" marginTop={5}>
        Edit profile
      </Typography>
      <Stack>
        <Stack
          flexDirection={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ background: "#EFEFEF", width: "100%", borderRadius: "16px" }}
        >
          <Stack flexDirection={"row"} gap={2}>
            <UserAvatar src={image || user.avatar} />
            <Stack>
              <Typography variant="body1" fontWeight={500}>
                {user.username}
              </Typography>
              {user?.description && (
                <Typography variant="body2" color="#737373">
                  {user.description}
                </Typography>
              )}
            </Stack>
          </Stack>
          <input type="file" hidden ref={fileInputRef} onChange={fileChange} />
          <Button
            variant="contained"
            onClick={() => fileInputRef.current.click()}
          >
            New photo
          </Button>
        </Stack>
      </Stack>
      <UserEditForm onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Typography>Username</Typography>
          <TextField
            size="small"
            {...register("username", {
              required: "username is required!",
              minLength: {
                value: 2,
                message: "Min 2 symbols!",
              },
              maxLength: {
                value: 12,
                message: "Max 12 symbols!",
              },
            })}
            sx={{ marginLeft: "8px" }}
          />
          {errors.username && (
            <Typography variant="body2" color="red">
              {errors.username.message}
            </Typography>
          )}
        </Stack>
        <Stack>
          <Typography>Name</Typography>
          <TextField
            size="small"
            {...register("name")}
            sx={{ marginLeft: "8px" }}
          />
        </Stack>
        <Stack justifyContent={"center"}>
          <Typography>Description</Typography>
          <TextField
            size="small"
            multiline
            rows={4}
            {...register("description")}
            sx={{ marginLeft: "8px" }}
          />
        </Stack>
        <Button variant="contained" type="submit" sx={{ width: "50%" }}>
          Save
        </Button>
      </UserEditForm>
    </Stack>
  );
}

export default EditUser;
