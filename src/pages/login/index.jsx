import { Button, Stack, TextField, Typography } from "@mui/material";
import FormContainer from "../../components/formContainer";
import { ErrorText, RegisterButton, RegisterForm } from "./styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      const result = dispatch(loginUser(data)).unwrap();

      console.log(result);
      navigate(`/user/${user.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack>
      <FormContainer
        text={"Don't have an account?"}
        linkText={"Sign up!"}
        link={"/register"}
      >
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
              Log in
            </RegisterButton>
          </RegisterForm>
        </Stack>
      </FormContainer>
    </Stack>
  );
}

export default Login;
