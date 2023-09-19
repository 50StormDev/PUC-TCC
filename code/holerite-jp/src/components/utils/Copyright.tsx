import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to={"/login"} >
        Holerite JP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}