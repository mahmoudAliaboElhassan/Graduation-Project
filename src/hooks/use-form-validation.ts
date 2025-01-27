import * as Yup from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";

function UseFormValidation() {
  const FORM_VALIDATION_SCHEMA_LOGIN = Yup.object({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email Field is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Email should have at least two characters after the last dot"
      ),
    password: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
  });

  const FORM_VALIDATION_SCHEMA_SIGNUP = Yup.object({
    firstname: Yup.string()
      .required("First Name is required")
      .min(2, "Minimum number of characters is 2"),
    lastname: Yup.string()
      .required("Last Name is required")
      .min(2, "Minimum number of characters is 2"),
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email Field is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Email should have at least two characters after the last dot"
      ),
    password: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum number of characters is 6"),
    confirmPassword: Yup.string()
      .required("Confirm Password Field is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    type: Yup.string().required("User Role is Required"),

    grade: Yup.string().when("type", {
      is: (value: unknown) => value == 0,
      then: (schema) => schema.required("Grade is required for students"),
      otherwise: (schema) => schema.notRequired(),
    }),

    subject: Yup.string().when("type", {
      is: (value: unknown) => value == 1,
      then: (schema) => schema.required("Subject is required for teachers"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD = Yup.object({
    currentPassword: Yup.string()
      .required("Current Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
    newPassword: Yup.string()
      .required("New Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
  });
  const FORM_VALIDATION_SCHEMA_ANSWER_QUESTION = Yup.object({
    answer: Yup.string().required("Question Answer Field is required"),
  });
  return {
    FORM_VALIDATION_SCHEMA_LOGIN,
    FORM_VALIDATION_SCHEMA_SIGNUP,
    FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD,
    FORM_VALIDATION_SCHEMA_ANSWER_QUESTION,
  };
}

export default UseFormValidation;
