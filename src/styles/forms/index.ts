import { styled } from "@mui/material/styles";
import { Form } from "formik";
import { Container } from "@mui/material";

export const FormWrapper = styled(Form)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  borderRadius: "22px",
  border: "1px solid white",
  padding: "8px 12px",
}));
export const ContainerFormWrapper = styled(Container)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
}));
