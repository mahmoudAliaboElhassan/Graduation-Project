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

export const LinkPlay = styled(Link)<{ dir: string }>(({ theme, dir }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "16px 32px",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  textDecoration: "none",
  borderRadius: "50px",
  minHeight: "56px",
  minWidth: "200px",
  position: "relative",
  overflow: "hidden",
  // More subtle background that matches your theme
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  color: "#ffffff",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  "&:hover": {
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",

    "& .MuiSvgIcon-root": {
      transform: dir === "ltr" ? "translateX(4px)" : "translateX(-4px)",
    },
  },

  "&:active": {
    transform: "translateY(0px)",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.3)",
  },

  [theme.breakpoints.down("sm")]: {
    minWidth: "180px",
    padding: "14px 24px",
    fontSize: "1rem",
  },

  "&:focus-visible": {
    outline: "2px solid rgba(255, 255, 255, 0.8)",
    outlineOffset: "2px",
  },
}));
