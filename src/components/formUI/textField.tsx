import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  type?: string;
}

const TextFieldWrapper = ({ name, type, label }: Props) => {
  const [field, mata] = useField(name);

  const configTextField: any = {
    fullWidth: true,
    label,
    type: type || "text",
    variant: "outlined",
    sx: { mb: 1.5 },
    InputProps: {
      style: { color: "white" }, // Apply the color to the input text
    },
    InputLabelProps: {
      style: { color: "gray" }, // Style for the label
    },
    ...field,
    // ...otherProps,
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
