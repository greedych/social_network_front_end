import { Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function LikeSection({ post, currentUser, onLike }) {
  const isLike = post?.likes?.includes(currentUser?._id);
  const likesCount = post?.likes?.length || 0;

  return (
    <Stack flexDirection="row" gap="5px">
      {isLike ? (
        <FavoriteIcon onClick={onLike} />
      ) : (
        <FavoriteBorderIcon onClick={onLike} />
      )}
      <Typography>{likesCount} likes</Typography>
    </Stack>
  );
}

export default LikeSection;
