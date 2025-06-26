import {
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  type SelectChangeEvent,
  Box,
  type SxProps,
  type Theme,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useState, useEffect, useCallback } from "react";
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

function MultiSelectComponent({
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

  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Ctrl key tracking
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      setIsCtrlPressed(true);
    }
  }, []);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        setIsCtrlPressed(false);
        // Close menu when Ctrl is released
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    // Add global key listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    // This won't be used for our custom click handling
    const value = event.target.value;
    setFieldValue(name, typeof value === "string" ? value.split(",") : value);
  };

  const handleMenuItemClick = (
    selectedValue: string | number,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const currentValues = field.value || [];

    if (isCtrlPressed) {
      // Multi-select mode with Ctrl
      if (currentValues.includes(selectedValue)) {
        // Remove if already selected
        const newValues = currentValues.filter(
          (value: string) => value !== selectedValue
        );
        setFieldValue(name, newValues);
      } else {
        // Add if not selected
        setFieldValue(name, [...currentValues, selectedValue]);
      }
      // Keep menu open when Ctrl is pressed
    } else {
      // Single select mode without Ctrl
      setFieldValue(name, [selectedValue]);
      setMenuOpen(false);
    }
  };

  const handleDelete = (chipToDelete: string) => {
    const currentValues = field.value || [];
    const newValues = currentValues.filter(
      (value: string) => value !== chipToDelete
    );
    setFieldValue(name, newValues);
  };

  const handleSelectOpen = () => {
    setMenuOpen(true);
  };

  const handleSelectClose = () => {
    if (!isCtrlPressed) {
      setMenuOpen(false);
    }
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

  const selectedValues = field.value || [];

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
        multiple
        value={selectedValues}
        onChange={handleChange}
        open={menuOpen}
        onOpen={handleSelectOpen}
        onClose={handleSelectClose}
        input={<OutlinedInput label={label} />}
        disabled={disabled}
        sx={getThemeStyles()}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                size="small"
                onDelete={() => handleDelete(value)}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                sx={{
                  backgroundColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.1)"
                      : "rgba(255, 107, 157, 0.1)",
                  color: mymode === "light" ? "#c31432" : "#ff6b9d",
                  border: `1px solid ${
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.3)"
                      : "rgba(255, 107, 157, 0.3)"
                  }`,
                  "& .MuiChip-deleteIcon": {
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    "&:hover": {
                      color: mymode === "light" ? "#a01228" : "#e55a8a",
                    },
                  },
                  "&:hover": {
                    backgroundColor:
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.2)"
                        : "rgba(255, 107, 157, 0.2)",
                  },
                }}
              />
            ))}
          </Box>
        )}
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
                cursor: isCtrlPressed ? "copy" : "pointer",
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
            },
          },
        }}
      >
        {options?.map(({ text, value }) => (
          <MenuItem
            key={value}
            value={value}
            selected={selectedValues.includes(value)}
            onClick={(event) => handleMenuItemClick(value!, event)}
          >
            {text}
            {isCtrlPressed && (
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  opacity: 0.7,
                  fontSize: "0.7rem",
                  fontStyle: "italic",
                }}
              >
                (Ctrl+Click)
              </Typography>
            )}
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

export default MultiSelectComponent;
