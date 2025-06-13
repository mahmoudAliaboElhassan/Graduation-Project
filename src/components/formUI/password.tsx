"use client";

import { type ComponentProps, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useField } from "formik";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UseDirection from "../../hooks/use-direction";

interface PasswordFieldProps {
  name: string;
  label: string;
}

const PasswordField = ({ name, label }: PasswordFieldProps) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const { direction } = UseDirection();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const configTextField: ComponentProps<typeof TextField> = {
    fullWidth: true,
    label,
    type: showPassword ? "text" : "password",
    variant: "outlined",
    sx: { mb: 1.5 },
    InputProps: {
      style: { color: "white" },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleTogglePassword}
            edge="end"
            sx={{ color: "gray" }}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
          </IconButton>
        </InputAdornment>
      ),
      // Adjust the icon position based on the text direction
      ...(direction.direction === "rtl" && {
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePassword}
              edge="start"
              sx={{ color: "gray" }}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: null,
      }),
    },
    InputLabelProps: {
      style: { color: "gray" },
    },
    ...field,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <div>
      <TextField {...configTextField} />
    </div>
  );
};

export default PasswordField;
