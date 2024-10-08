import React from "react";

function UseInitialValues() {
  const INITIAL_FORM_STATE_SIGNUP = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };
  const INITIAL_FORM_STATE_LOGIN = {
    username: "",
    password: "",
  };
  return { INITIAL_FORM_STATE_SIGNUP, INITIAL_FORM_STATE_LOGIN };
}

export default UseInitialValues;
