import { styled } from "@mui/material/styles";

export const FooterContainer = styled("div")<{ mode: string }>(({ mode }) => ({
  padding: "16px",
  flexGrow: 1,
  // marginTop: "3rem",
  textAlign: "center",
  fontSize: "20px",
  // fontStyle: "italic",
  background:
    mode === "dark"
      ? "linear-gradient(0deg, #101021, #32000a)"
      : "linear-gradient(0deg, #b81c1a, #002a52)",
}));
