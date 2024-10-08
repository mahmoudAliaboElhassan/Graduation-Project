import React from "react";
import { useFormikContext } from "formik";
// import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LoaderBtn from "./loaderBtn";

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const ButtonWrapper = ({ children, loading }: Props) => {
  const { submitForm } = useFormikContext();
  const { t } = useTranslation();
  // Change the event type to React.MouseEvent<HTMLButtonElement>
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitForm();
  };

  // Change the type to React.ButtonHTMLAttributes<HTMLButtonElement>
  const configButton: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    disabled: loading,
    onClick: handleSubmit,
    style: { margin: "auto", display: "flex" },
  };

  return (
    <button {...configButton}>{loading ? <LoaderBtn /> : children}</button>
  );
};

export default ButtonWrapper;
