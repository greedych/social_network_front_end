import { Box, Stack, Typography } from "@mui/material";
import { FormStack, NovigationBox, NavigationLink } from "./styles";
import { Link, useNavigate } from "react-router-dom";

function FormContainer({ children, text, linkText, link }) {
  const navigate = useNavigate();

  const toMain = () => {
    navigate("/");
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} gap={2}>
      <FormStack>
        <Typography
          onClick={toMain}
          variant="h2"
          textAlign={"center"}
          fontWeight={"bold"}
          sx={{ cursor: "pointer" }}
        >
          5gramm
        </Typography>
        {children}
      </FormStack>
      <NovigationBox>
        <Typography>{text}</Typography>
        <NavigationLink component={Link} to={link}>
          {linkText}
        </NavigationLink>
      </NovigationBox>
    </Stack>
  );
}

export default FormContainer;
