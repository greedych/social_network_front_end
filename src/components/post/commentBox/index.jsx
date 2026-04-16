import { Avatar, Stack, Typography } from "@mui/material";
import { CommentText } from "./styles";

function CommentBox({ comment }) {
  return (
    <Stack padding={"10px"}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={"5px"}>
        <Avatar src={comment.user?.avatar} />
        <Stack flexDirection={"row"} alignItems={"flex-start"} gap={1}>
          <Typography fontWeight={500}>{comment.user?.username}</Typography>
          <CommentText variant="body1">{comment.text}</CommentText>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CommentBox;
