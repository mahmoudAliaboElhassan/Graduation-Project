import {
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import { Colors } from "../../../styles/theme";
import UseThemMode from "../../../hooks/use-theme-mode";

type Options = {
  text: string;
  value: number;
};
interface Props {
  name: string;
  label: string;
  options: Options[];
}

function SelectComponent({ name, label, options }: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (evt: any) => {
    const { value } = evt.target;
    console.log(typeof value);
    setFieldValue(name, value);
    console.log(value);
  };
  const { themeMode } = UseThemMode();
  const configSelect: any = {
    ...field,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      style={{ marginBottom: "8px" }} // or any value that works for spacing
    >
      <InputLabel
        style={{
          color:
            meta.error && meta.touched
              ? Colors.labelError
              : themeMode == "dark"
              ? Colors.labelDark
              : Colors.labelLight,
          marginTop: "5px",
        }}
      >
        {label}
      </InputLabel>
      <Select
        {...configSelect}
        style={{ color: themeMode === "dark" ? "white" : "inherit" }}
      >
        {options?.map(({ text, value }) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
      <Typography
        component="div"
        sx={{ color: Colors.labelError, fontSize: "0.75rem" }}
      >
        {configSelect.helperText}
      </Typography>
    </FormControl>
  );
}

export default SelectComponent;
