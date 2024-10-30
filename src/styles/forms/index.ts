import { styled } from "@mui/material/styles";
import { Form } from "formik";
 import {   Container } from "@mui/material";

export const FormWrapper = styled(Form)(({ theme }) => ({
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
 
  }));
export const ContainerFormWrapper = styled(Container)(({ theme }) => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  }));
