import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const Hint = styled(Grid)({
  border: "3px solid white",
  borderRadius: "8px",
  minHeight: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const Timer = styled(Grid)<{ timeExceeded: boolean }>(
  ({ timeExceeded }) => ({
    width: "fit-content",
    margin: "auto",
    borderRadius: "50%",
    padding: "19px",
    backgroundColor: timeExceeded ? "green" : "#eee",
    marginBottom: "10px",
    color: timeExceeded ? "white" : "black",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "1rem",
  })
);

export const LinkPlay = styled(Link)<{ dir: string }>(({ dir }) => ({
  display: "block",
  textAlign: "center",
  textDecoration: "none",

  "& svg": {
    transition: "transform 0.3s ease-in-out",
  },

  "&:hover svg": {
    transform: dir === "ltr" ? "translateX(5px)" : "translate(-5px)", // Moves the icon to the right on hover
  },
}));
