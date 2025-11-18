import { styled } from "@mui/material/styles"
import { Form } from "formik"
import { Container } from "@mui/material"

export const FormWrapper = styled(Form)(() => ({
  borderRadius: "25px",
  padding: "8px 12px",
}))

export const ContainerFormWrapper = styled(Container)<{
  backgroundImage?: string
}>(({ theme, backgroundImage }) => ({
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "12px",
  padding: theme.spacing(3),
  boxShadow:
    "1px -10px 11px 6px rgba(0, 0, 0, 0.2), -8px 4px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);",
}))
