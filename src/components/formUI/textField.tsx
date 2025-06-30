import React, { ComponentProps } from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { useAppSelector } from "../../hooks/redux";
import { useLocation } from "react-router-dom";

interface Props {
  name: string;
  label: string;
  type?: string;
}

const TextFieldWrapper = ({ name, type, label }: Props) => {
  const [field, mata] = useField(name);
  const location = useLocation();

  const { mymode } = useAppSelector((state) => state.mode);

  // Check if current path is an auth route
  const isAuthRoute = [
    "/login",
    "/signup",
    "/change-password",
    "/password-forget",
    "/password-reset",
  ].some(
    (authPath) =>
      location.pathname === authPath ||
      location.pathname.startsWith("/password-reset/")
  );

  // Determine text color based on auth route or mymode
  const getTextColor = (): string => {
    if (isAuthRoute || location.pathname.startsWith("/admin")) {
      return "white";
    }
    return mymode === "dark" ? "white" : "black";
  };

  const configTextField: ComponentProps<typeof TextField> = {
    fullWidth: true,
    label,
    type: type || "text",
    variant: "outlined",
    sx: { mb: 1.5 },
    InputProps: {
      style: { color: getTextColor() }, // Apply the color to the input text
    },
    InputLabelProps: {
      style: { color: "gray" }, // Style for the label
    },
    ...field,
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  return (
    <div>
      <TextField {...configTextField} />
    </div>
  );
};

export default TextFieldWrapper;
