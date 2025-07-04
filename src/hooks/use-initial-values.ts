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
  InitialValuesAddGrade,
  InitialValuesAddSubject,
  InitialValuesAddChapter,
  InitialValuesAddSubjects,
} from "../utils/types/initialValues";

function UseInitialValues() {
  const INITIAL_FORM_STATE_SIGNUP: InitialValuesSignUp = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
    gradeUser: "",
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
  const INITIAL_FORM_STATE_ADD_GRADE: InitialValuesAddGrade = {
    grade: "",
  };
  const InitialValuesAddSubject: InitialValuesAddSubject = {
    name: "",
    image: null,
  };
  const INITIAL_FORM_STATE_ADD_CHAPTER: InitialValuesAddChapter = {
    gradesSelect: null,
    subjectQetQuestions: "",
    chapterName: "",
    chapterNumber: null,
  };
  const INITIAL_FORM_STATE_ADD_SUBJECTS: InitialValuesAddSubjects = {
    gradesSelect: null,
    subjects: [],
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
    INITIAL_FORM_STATE_ADD_GRADE,
    InitialValuesAddSubject,
    INITIAL_FORM_STATE_ADD_CHAPTER,
    INITIAL_FORM_STATE_ADD_SUBJECTS,
  };
}

export default UseInitialValues;
