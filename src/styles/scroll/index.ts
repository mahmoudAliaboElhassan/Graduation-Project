import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const ScrollButton = styled(IconButton)<{ mode: string }>(
  ({ mode }) => ({
    flexGrow: 1,
    fontFamily: '"Montez","cursive"',
    textAlign: "center",
    fontSize: "2.25em",
    fontStyle: "italic",
    padding: "8px",
    background:
      mode === "dark"
        ? "linear-gradient(0deg, #101021, #32000a)"
        : "linear-gradient(0deg, #b81c1a, #002a52)",
  })
);
