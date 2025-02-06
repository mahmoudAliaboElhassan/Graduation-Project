import React from "react";
import {
  InitialValuesLogin,
  InitialValuesSignUp,
  InitialValuesChangePassword,
  InitialValuesAnswerQuestion,
  InitialValeuesGetQuestion,
  InitialValuesContacts,
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
  const INITIAL_FORM_STATE_GET_QUESTIONS: InitialValeuesGetQuestion = {
    subject: "",
    chapter: "",
  };
  const INITIAL_FORM_STATE_CONTACT: InitialValuesContacts = {
    email: "",
    name: "",
    title: "",
    message: "",
  };
  return {
    INITIAL_FORM_STATE_SIGNUP,
    INITIAL_FORM_STATE_LOGIN,
    INITIAL_FORM_STATE_CHANGE_PASSWORD,
    INITIAL_FORM_STATE_ANSWER_QUESTION,
    INITIAL_FORM_STATE_GET_QUESTIONS,
    INITIAL_FORM_STATE_CONTACT,
  };
}

export default UseInitialValues;
