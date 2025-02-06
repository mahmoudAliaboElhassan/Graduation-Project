import { styled } from "@mui/material/styles";
import { Form } from "formik";
import { Container } from "@mui/material";

export const FormWrapper = styled(Form)(({ theme }) => ({
  marginTop: theme.spacing(0), // Default for small screens
  marginBottom: theme.spacing(5),
  borderRadius: "25px",
  padding: "8px 12px",

  [theme.breakpoints.up("md")]: {
    marginTop: theme.spacing(5), // Apply margin-top only on large screens
  },
}));

export const ContainerFormWrapper = styled(Container)<{
  backgroundImage?: string;
}>(({ theme, backgroundImage }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "12px",
  padding: theme.spacing(3),
  boxShadow:
    "1px -10px 11px 6px rgba(0, 0, 0, 0.2), -8px 4px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);",
}));
