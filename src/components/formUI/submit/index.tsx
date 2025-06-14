import type React from "react";
import type { ComponentProps } from "react";
import { useFormikContext } from "formik";
import LoaderBtn from "./loaderBtn";
import { Button, Container, type SxProps, type Theme } from "@mui/material";

import type { MouseEvent } from "../../../utils/types/events";
import { useAppSelector } from "../../../hooks/redux";
import UseLoadingStatus from "../../../hooks/use-loading-status";

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
}

const ButtonWrapper = ({
  children,
  fullWidth,
  sx,
  disabled: externalDisabled,
  variant = "contained",
  color,
  size = "medium",
  ...otherProps
}: Props) => {
  const { submitForm } = useFormikContext();

  // Handle submit with custom onClick if provided
  const handleSubmit = (e: MouseEvent): void => {
    e.preventDefault();

    submitForm();
  };

  const loadingStatus = UseLoadingStatus();
  const { mymode } = useAppSelector(
    (state: { mode: { mymode: string } }) => state.mode
  );

  // Theme-based styling
  const getThemeStyles = (): SxProps<Theme> => {
    const baseStyles: SxProps<Theme> = {
      margin: "auto",
      display: "flex",
      fontWeight: "bold",
      textTransform: "none",
      borderRadius: 2,
      py: 1.5,
      px: 3,
      transition: "all 0.3s ease",
      ...sx,
    };

    if (variant === "contained") {
      return {
        ...baseStyles,
        backgroundColor: mymode === "light" ? "#c31432" : "#ff6b9d",
        color: "#ffffff",
        border: "none",
        "&:hover": {
          backgroundColor: mymode === "light" ? "#a01729" : "#ff4081",
          transform: "translateY(-2px)",
          boxShadow:
            mymode === "light"
              ? "0 8px 25px rgba(195, 20, 50, 0.3)"
              : "0 8px 25px rgba(255, 107, 157, 0.3)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
        "&:disabled": {
          backgroundColor:
            mymode === "light"
              ? "rgba(0, 0, 0, 0.12)"
              : "rgba(255, 255, 255, 0.12)",
          color:
            mymode === "light"
              ? "rgba(0, 0, 0, 0.26)"
              : "rgba(255, 255, 255, 0.26)",
          transform: "none",
          boxShadow: "none",
        },
      };
    } else if (variant === "outlined") {
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: mymode === "light" ? "#c31432" : "#ff6b9d",
        border: `2px solid ${mymode === "light" ? "#c31432" : "#ff6b9d"}`,
        "&:hover": {
          backgroundColor:
            mymode === "light"
              ? "rgba(195, 20, 50, 0.1)"
              : "rgba(255, 107, 157, 0.1)",
          borderColor: mymode === "light" ? "#a01729" : "#ff4081",
          transform: "translateY(-2px)",
          boxShadow:
            mymode === "light"
              ? "0 8px 25px rgba(195, 20, 50, 0.2)"
              : "0 8px 25px rgba(255, 107, 157, 0.2)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
        "&:disabled": {
          borderColor:
            mymode === "light"
              ? "rgba(0, 0, 0, 0.12)"
              : "rgba(255, 255, 255, 0.12)",
          color:
            mymode === "light"
              ? "rgba(0, 0, 0, 0.26)"
              : "rgba(255, 255, 255, 0.26)",
          transform: "none",
          boxShadow: "none",
        },
      };
    } else {
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: mymode === "light" ? "#c31432" : "#ff6b9d",
        border: "none",
        "&:hover": {
          backgroundColor:
            mymode === "light"
              ? "rgba(195, 20, 50, 0.1)"
              : "rgba(255, 107, 157, 0.1)",
        },
        "&:disabled": {
          color:
            mymode === "light"
              ? "rgba(0, 0, 0, 0.26)"
              : "rgba(255, 255, 255, 0.26)",
        },
      };
    }
  };

  const configButton: ComponentProps<typeof Button> = {
    type: "submit",
    onClick: handleSubmit,
    variant,
    disabled: externalDisabled || loadingStatus,
    fullWidth,
    size,
    sx: getThemeStyles(),
    ...otherProps,
  };

  return (
    <Container maxWidth="xs" sx={{ p: 0 }}>
      <Button {...configButton}>
        {loadingStatus ? <LoaderBtn /> : children}
      </Button>
    </Container>
  );
};

export default ButtonWrapper;
