import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  ListSubheader,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { Colors } from "../../../styles/theme";
import UseThemMode from "../../../hooks/use-theme-mode";

type Options = {
  text?: string;
  value?: number | string;
  group?: string;
  name?: string;
  number?: number;
  subjectName?: string;
  subjectImage?: string;
};

interface Props {
  name: string;
  label: string;
  options: Options[];
}

function SelectComponent({ name, label, options }: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt: SelectChangeEvent) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const { themeMode } = UseThemMode();

  const configSelect: any = {
    ...field,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
    value: field.value || "", // Ensure the value is controlled by Formik
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  console.log("options", options);
  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      style={{ marginBottom: "8px" }}
    >
      <InputLabel
        style={{
          color:
            meta.error && meta.touched ? Colors.labelError : Colors.labelDark,
          marginTop: "5px",
        }}
      >
        {label}
      </InputLabel>
      <Select
        id="grouped-select"
        label={label}
        {...configSelect}
        style={{ color: themeMode === "dark" ? "white" : "inherit" }}
      >
        {name === "grade"
          ? options.map(({ text, value, group }, idx) => (
              <MenuItem
                key={value}
                value={value}
                disabled={idx === 0 || idx === 7 || idx === 11}
              >
                {idx === 0 || idx === 7 || idx === 11 ? (
                  <ListSubheader style={{ width: "100%" }}>
                    🏫{group}
                  </ListSubheader>
                ) : (
                  text
                )}
              </MenuItem>
            ))
          : name == "subjectQetQuestions"
          ? options?.map((subject) => (
              <MenuItem
                key={subject.subjectName as string}
                value={subject.subjectName as string}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {subject.subjectImage && (
                    <img
                      src={subject.subjectImage}
                      alt={subject.subjectName}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <span>{subject.subjectName as string}</span>
                </Box>
              </MenuItem>
            ))
          : name == "chapter"
          ? options?.map(({ name, number }) => (
              <MenuItem key={number} value={number}>
                {name}
              </MenuItem>
            ))
          : name == "chapterMakeQuestion"
          ? options?.map(({ name, number }) => (
              <MenuItem key={number} value={name}>
                {name}
              </MenuItem>
            ))
          : options?.map(({ text, value }) => (
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
