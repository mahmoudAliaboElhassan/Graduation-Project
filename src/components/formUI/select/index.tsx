import {
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  ListSubheader,
  type SelectChangeEvent,
  Box,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import UseThemMode from "../../../hooks/use-theme-mode";
import { useAppSelector } from "../../../hooks/redux";

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
  disabled?: boolean;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
}

function SelectComponent({
  name,
  label,
  options,
  disabled = false,
  sx,
  size = "medium",
  variant = "outlined",
}: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { mymode } = useAppSelector(
    (state: { mode: { mymode: string } }) => state.mode
  );

  const handleChange = (evt: SelectChangeEvent) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const { themeMode } = UseThemMode();

  // Theme-based styling
  const getThemeStyles = (): SxProps<Theme> => ({
    "& .MuiOutlinedInput-root": {
      color: mymode === "light" ? "inherit" : "white",
      "& fieldset": {
        borderColor:
          mymode === "light"
            ? "rgba(195, 20, 50, 0.3)"
            : "rgba(255, 107, 157, 0.3)",
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
      },
      "&.Mui-focused fieldset": {
        borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
        borderWidth: "2px",
      },
      "&.Mui-error fieldset": {
        borderColor: "#f44336",
      },
      "&.Mui-disabled": {
        "& fieldset": {
          borderColor:
            mymode === "light"
              ? "rgba(0, 0, 0, 0.12)"
              : "rgba(255, 255, 255, 0.12)",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color:
        meta.error && meta.touched
          ? "#f44336"
          : mymode === "light"
          ? "#c31432"
          : "#ff6b9d",
      "&.Mui-focused": {
        color:
          meta.error && meta.touched
            ? "#f44336"
            : mymode === "light"
            ? "#c31432"
            : "#ff6b9d",
      },
      "&.Mui-disabled": {
        color:
          mymode === "light"
            ? "rgba(0, 0, 0, 0.38)"
            : "rgba(255, 255, 255, 0.38)",
      },
    },
    "& .MuiSelect-icon": {
      color: mymode === "light" ? "#c31432" : "#ff6b9d",
    },
    ...sx,
  });

  const configSelect: any = {
    ...field,
    fullWidth: true,
    variant,
    size,
    onChange: handleChange,
    value: field.value || "",
    disabled,
    sx: getThemeStyles(),
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  console.log("options", options);

  return (
    <FormControl
      fullWidth
      variant={variant}
      error={meta.touched && Boolean(meta.error)}
      disabled={disabled}
      size={size}
      sx={{
        mb: 1,
        "& .MuiFormHelperText-root": {
          color: "#f44336",
          fontSize: "0.75rem",
          mt: 0.5,
        },
      }}
    >
      <InputLabel
        sx={{
          color:
            meta.error && meta.touched
              ? "#f44336"
              : mymode === "light"
              ? "#c31432"
              : "#ff6b9d",
          "&.Mui-focused": {
            color:
              meta.error && meta.touched
                ? "#f44336"
                : mymode === "light"
                ? "#c31432"
                : "#ff6b9d",
          },
          "&.Mui-disabled": {
            color:
              mymode === "light"
                ? "rgba(0, 0, 0, 0.38)"
                : "rgba(255, 255, 255, 0.38)",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        id="grouped-select"
        label={label}
        {...configSelect}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor:
                mymode === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(26, 26, 46, 0.95)",
              backdropFilter: "blur(10px)",
              border:
                mymode === "light"
                  ? "1px solid rgba(195, 20, 50, 0.2)"
                  : "1px solid rgba(255, 107, 157, 0.3)",
              boxShadow:
                mymode === "light"
                  ? "0 8px 32px rgba(195, 20, 50, 0.1)"
                  : "0 8px 32px rgba(26, 26, 46, 0.3)",
              "& .MuiMenuItem-root": {
                color: mymode === "light" ? "inherit" : "white",
                "&:hover": {
                  backgroundColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.1)"
                      : "rgba(255, 107, 157, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.2)"
                      : "rgba(255, 107, 157, 0.2)",
                  "&:hover": {
                    backgroundColor:
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.3)"
                        : "rgba(255, 107, 157, 0.3)",
                  },
                },
                "&.Mui-disabled": {
                  color:
                    mymode === "light"
                      ? "rgba(0, 0, 0, 0.26)"
                      : "rgba(255, 255, 255, 0.26)",
                },
              },
              "& .MuiListSubheader-root": {
                backgroundColor:
                  mymode === "light"
                    ? "rgba(195, 20, 50, 0.1)"
                    : "rgba(255, 107, 157, 0.1)",
                color: mymode === "light" ? "#c31432" : "#ff6b9d",
                fontWeight: "bold",
              },
            },
          },
        }}
      >
        {name === "grade"
          ? options.map(({ text, value, group }, idx) => (
              <MenuItem
                key={value}
                value={value}
                disabled={idx === 0 || idx === 7 || idx === 11}
              >
                {idx === 0 || idx === 7 || idx === 11 ? (
                  <ListSubheader sx={{ width: "100%", py: 1 }}>
                    🏫 {group}
                  </ListSubheader>
                ) : (
                  text
                )}
              </MenuItem>
            ))
          : name === "subjectQetQuestions"
          ? options?.map((subject) => (
              <MenuItem
                key={subject.subjectName as string}
                value={subject.subjectName as string}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {subject.subjectImage && (
                    <img
                      src={subject.subjectImage || "/placeholder.svg"}
                      alt={subject.subjectName}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                        objectFit: "cover",
                        border: `1px solid ${
                          mymode === "light"
                            ? "rgba(195, 20, 50, 0.2)"
                            : "rgba(255, 107, 157, 0.2)"
                        }`,
                      }}
                    />
                  )}
                  <span>{subject.subjectName as string}</span>
                </Box>
              </MenuItem>
            ))
          : name === "chapter"
          ? options?.map(({ name, number }) => (
              <MenuItem key={number} value={number}>
                {name}
              </MenuItem>
            ))
          : name === "chapterMakeQuestion" || name === "chapter-make-question"
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
      {meta.touched && meta.error && (
        <Typography
          component="div"
          sx={{
            color: "#f44336",
            fontSize: "0.75rem",
            mt: 0.5,
            ml: 1.75,
          }}
        >
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
}

export default SelectComponent;
