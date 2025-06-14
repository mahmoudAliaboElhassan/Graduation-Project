import React from "react";
import {
  InitialValuesLogin,
  InitialValuesSignUp,
  InitialValuesChangePassword,
  InitialValuesAnswerQuestion,
  InitialValeuesGetQuestion,
  InitialValuesContacts,
  InitialValuesOffsideGame,
  InitialValuesForgetPassword,
  InitialValuesResetPassword,
} from "../utils/types/initialValues";

function UseInitialValues() {
  const INITIAL_FORM_STATE_SIGNUP: InitialValuesSignUp = {
    name: "",
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
    subjectQetQuestions: "",
    chapter: "",
  };
  const INITIAL_FORM_STATE_CONTACT: InitialValuesContacts = {
    email: "",
    name: "",
    title: "",
    message: "",
  };
  const INITIAL_FORM_STATE_OFFSIDE_GAME: InitialValuesOffsideGame = {
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
  };
  const INITIAL_FORM_STATE_FORGET_PASSWORD: InitialValuesForgetPassword = {
    email: "",
  };
  const INITIAL_FORM_STATE_RESET_PASSWORD: InitialValuesResetPassword = {
    password: "",
  };
  return {
    INITIAL_FORM_STATE_SIGNUP,
    INITIAL_FORM_STATE_LOGIN,
    INITIAL_FORM_STATE_CHANGE_PASSWORD,
    INITIAL_FORM_STATE_ANSWER_QUESTION,
    INITIAL_FORM_STATE_GET_QUESTIONS,
    INITIAL_FORM_STATE_CONTACT,
    INITIAL_FORM_STATE_OFFSIDE_GAME,
    INITIAL_FORM_STATE_FORGET_PASSWORD,
    INITIAL_FORM_STATE_RESET_PASSWORD,
  };
}

export default UseInitialValues;
