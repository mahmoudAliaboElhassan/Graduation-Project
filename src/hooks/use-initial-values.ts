import React from "react";
import {
  InitialValuesLogin,
  InitialValuesSignUp,
  InitialValuesChangePassword,
  InitialValuesAnswerQuestion,
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
  const INITIAL_FORM_STATE_ANSWER_QUESTION: InitialValuesAnswerQuestion = {
    answer: "",
  };
  return {
    INITIAL_FORM_STATE_SIGNUP,
    INITIAL_FORM_STATE_LOGIN,
    INITIAL_FORM_STATE_CHANGE_PASSWORD,
    INITIAL_FORM_STATE_ANSWER_QUESTION,
  };
}

export default UseInitialValues;
