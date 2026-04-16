import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/formContainer";
import { ErrorText, RegisterButton, RegisterForm } from "./styles";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();

      console.log(result);

      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack>
      <FormContainer
        text={"Have an account? "}
        linkText={"Log in"}
        link={"/login"}
      >
        <Typography width={"255px"} textAlign={"center"}>
          Sign up to see photos and videos from your friends.
        </Typography>
        <Stack width={"100%"}>
          <RegisterForm fullWidth onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              type="text"
              label="Email"
              fullWidth
              size="small"
              {...register("email", { required: "email is required!" })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <TextField
              variant="outlined"
              type="text"
              label="Username"
              fullWidth
              size="small"
              {...register("username", {
                required: "username is required!",
                minLength: 2,
              })}
            />
            {errors.username && (
              <ErrorText>{errors.username.message}</ErrorText>
            )}
            <TextField
              variant="outlined"
              type="text"
              label="Name"
              fullWidth
              size="small"
              {...register("name", { minLength: 2 })}
            />
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              fullWidth
              size="small"
              {...register("password", {
                required: "password is required!",
                minLength: 5,
              })}
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
            <RegisterButton variant="contained" type="submit" fullWidth>
              Sign up
            </RegisterButton>
          </RegisterForm>
        </Stack>
      </FormContainer>
    </Stack>
  );
}

export default Register;
