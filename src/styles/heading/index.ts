import { styled } from "@mui/material/styles";
import "@fontsource/montez";
import { Typography } from "@mui/material";
 

export const HeadingElement = styled(Typography)<{ mode?: string }>(
  ({ mode }) => ({
  padding: "2px",
  flexGrow: 1,
  fontFamily: '"Montez","cursive"',
  textAlign: "center",
  fontSize: "2.25em",
  fontStyle: "italic",
  marginBottom: "8px",
  color:mode==="dark"? "gray":"#d0c2c2",
  marginTop: "8px",
  maxWidth: "700px",
  marginLeft: "auto",
  marginRight: "auto",
})
);
