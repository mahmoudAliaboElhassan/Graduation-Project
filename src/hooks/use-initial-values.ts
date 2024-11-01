import React from "react";
import {
  InitialValuesLogin,
  InitialValuesSignUp,
  InitialValuesChangePassword
} from "../utils/types/initialValues";

function UseInitialValues() {
  const INITIAL_FORM_STATE_SIGNUP: InitialValuesSignUp = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
    grade: "",
    subject: "",
  };
  const INITIAL_FORM_STATE_LOGIN: InitialValuesLogin = {
    email: "",
    password: "",
  };
  const INITIAL_FORM_STATE_CHANGE_PASSWORD: InitialValuesChangePassword = {
    currentPassword: "",
    newPassword: "",
  };
  return { INITIAL_FORM_STATE_SIGNUP, INITIAL_FORM_STATE_LOGIN ,INITIAL_FORM_STATE_CHANGE_PASSWORD};
}

export default UseInitialValues;
