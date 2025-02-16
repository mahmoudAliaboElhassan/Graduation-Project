import { styled } from "@mui/material/styles";

export const FooterContainer = styled("div")<{ mode: string }>(({ mode }) => ({
  padding: "80px 0",
  flexGrow: 1,
  lineHeight: "1.5",
  // marginTop: "3rem",
  textAlign: "center",
  fontFamily: "Monomakh !important",

  fontSize: "20px",
  // fontStyle: "italic",
  background:
    mode === "dark"
      ? "linear-gradient(0deg, #101021, #32000a)"
      : "linear-gradient(0deg, #b81c1a, #002a52)",
  color: "white",
}));
