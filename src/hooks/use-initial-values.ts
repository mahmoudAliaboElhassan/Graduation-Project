import React from "react";
import {
  InitialValuesLogin,
  InitialValuesSignUp,
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
  return { INITIAL_FORM_STATE_SIGNUP, INITIAL_FORM_STATE_LOGIN };
}

export default UseInitialValues;
