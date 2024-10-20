import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import LoaderBtn from "./loaderBtn";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  children: React.ReactNode;
}

const ButtonWrapper = ({ children }: Props) => {
  const { submitForm } = useFormikContext();
  const { t } = useTranslation();

  // Change the event type to React.MouseEvent<HTMLButtonElement>
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitForm();
  };
  const { mymode } = useAppSelector((state) => state.mode);
  // Keep the configButton type as React.ButtonHTMLAttributes<HTMLButtonElement>
  const configButton: any = {
    type: "submit",
    onClick: handleSubmit,
    style: { margin: "auto", display: "flex" },
    color: mymode === "dark" ? "secondary" : "primary",
    variant: "outlined",
  };

  return (
    <Button {...configButton}>
      {/* Uncomment when loading is implemented */}
      {/* {loading ? <LoaderBtn /> :  */}
      {children}
      {/* } */}
    </Button>
  );
};

export default ButtonWrapper;
