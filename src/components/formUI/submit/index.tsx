import React, { ComponentProps } from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import LoaderBtn from "./loaderBtn";
import { Button, Container } from "@mui/material";

import { MouseEvent } from "../../../utils/types/events";
import { useAppSelector } from "../../../hooks/redux";
import UseLoadingStatus from "../../../hooks/use-loading-status";

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const ButtonWrapper = ({ children, fullWidth }: Props) => {
  const { submitForm } = useFormikContext();

  // Change the event type to React.MouseEvent<HTMLButtonElement>
  const handleSubmit = (e: MouseEvent): void => {
    e.preventDefault();
    submitForm();
  };

  const loadingStatus = UseLoadingStatus();
  const { mymode } = useAppSelector(
    (state: { mode: { mymode: string } }) => state.mode
  );
  // Use ComponentProps<typeof Button> since MUI Button is not a regular <button>

  const configButton: ComponentProps<typeof Button> = {
    type: "submit",
    onClick: handleSubmit,
    // fullWidth: true,
    style: { margin: "auto", display: "flex" },
    color: mymode === "dark" ? "secondary" : "primary",
    variant: "outlined",
    disabled: loadingStatus,
    fullWidth,
  };

  return (
    <Container maxWidth="xs">
      <Button {...configButton}>
        {/* Uncomment when loading is implemented */}
        {/* {loading ? <LoaderBtn /> :  */}
        {children}
        {/* } */}
      </Button>
    </Container>
  );
};

export default ButtonWrapper;
