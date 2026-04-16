import { Box, Stack, Typography } from "@mui/material";
import { FormStack, NovigationBox } from "./styles";
import { Link } from "react-router-dom";

function FormContainer({ children, text, linkText, link }) {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} gap={2}>
      <FormStack>
        <Typography variant="h2" textAlign={"center"} fontWeight={"bold"}>
          5gramm
        </Typography>
        {children}
      </FormStack>
      <NovigationBox>
        <Typography>{text}</Typography>
        <Link to={link}>{linkText}</Link>
      </NovigationBox>
    </Stack>
  );
}

export default FormContainer;
