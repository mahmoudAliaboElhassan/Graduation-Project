import * as Yup from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useTranslation } from "react-i18next";

function UseFormValidation() {
  const { t } = useTranslation();
  const FORM_VALIDATION_SCHEMA_LOGIN = Yup.object({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Email should have at least two characters after the last dot"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(/[0-9]/, "Password must contain at least one number (0-9)")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (!@#$%^&*, etc.)"
      ),
  });

  const FORM_VALIDATION_SCHEMA_SIGNUP = Yup.object({
    name: Yup.string()
      .required("Full Name is required")
      .min(3, "Minimum number of characters is 3"),
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Email should have at least two characters after the last dot"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(/[0-9]/, "Password must contain at least one number (0-9)")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (!@#$%^&*, etc.)"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    type: Yup.string().required("User Role is Required"),

    gradeUser: Yup.string().when("type", {
      is: (value: unknown) => value == "0",
      then: (schema) => schema.required("Grade is required for students"),
      otherwise: (schema) => schema.notRequired(),
    }),

    subject: Yup.string().when("type", {
      is: (value: unknown) => value == "1",
      then: (schema) => schema.required("Subject is required for teachers"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD = Yup.object({
    currentPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(/[0-9]/, "Password must contain at least one number (0-9)")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (!@#$%^&*, etc.)"
      ),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(/[0-9]/, "Password must contain at least one number (0-9)")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (!@#$%^&*, etc.)"
      ),
  });
  const FORM_VALIDATION_SCHEMA_ANSWER_QUESTION = Yup.object({
    answer: Yup.string().required("Question Answer is required"),
  });
  const FORM_VALIDATION_SCHEMA_GET_QUESTIONS = Yup.object({
    subjectQetQuestions: Yup.string().required("Subject is required"),
    chapter: Yup.string().required("chapter is required"),
  });
  const FORM_VALIDATION_SCHEMA_CONTACTS = Yup.object({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Email should have at least two characters after the last dot"
      ),
    title: Yup.string().required("title is required"),
    name: Yup.string().required("name is required"),
    message: Yup.string().required("title is required"),
  });
  const FORM_VALIDATION_OFFSIDE_GAME = Yup.object({
    question1: Yup.string().required("Required"),
    question2: Yup.string().required("Required"),
    question3: Yup.string().required("Required"),
    question4: Yup.string().required("Required"),
    question5: Yup.string().required("Required"),
    question6: Yup.string().required("Required"),
  });
  const FORM_VALIDATION_SCHEMA_FORGET_PASSWORD = Yup.object({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Email should have at least two characters after the last dot"
      ),
  });
  const FORM_VALIDATION_SCHEMA_RESET_PASSWORD = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .matches(/[0-9]/, "Password must contain at least one number (0-9)")
      .matches(
        /[\W_]/,
        "Password must contain at least one special character (!@#$%^&*, etc.)"
      ),
  });
  const FORM_VALIDATION_SCHEMA_ADD_GRADE = Yup.object({
    grade: Yup.string().required("grade is required"),
  });
  const FORM_VALIDATION_SCHEMA_ADD_Subject = Yup.object().shape({
    name: Yup.string()
      .min(2, t("name-too-short") || "Name must be at least 2 characters")
      .required(t("name-required") || "Subject name is required"),
    image: Yup.mixed()
      .required(t("image-required") || "Subject image is required")
      .test(
        "fileType",
        t("invalid-file-type") || "Please select a valid image file",
        (value) => {
          if (!value) return false;
          const file = value as File;
          const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
          ];
          return allowedTypes.includes(file.type);
        }
      )
      .test(
        "fileSize",
        t("file-too-large") || "Image size should be less than 5MB",
        (value) => {
          if (!value) return false;
          const file = value as File;
          const maxSize = 5 * 1024 * 1024; // 5MB
          return file.size <= maxSize;
        }
      ),
  });

  return {
    FORM_VALIDATION_SCHEMA_LOGIN,
    FORM_VALIDATION_SCHEMA_SIGNUP,
    FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD,
    FORM_VALIDATION_SCHEMA_ANSWER_QUESTION,
    FORM_VALIDATION_SCHEMA_GET_QUESTIONS,
    FORM_VALIDATION_SCHEMA_CONTACTS,
    FORM_VALIDATION_OFFSIDE_GAME,
    FORM_VALIDATION_SCHEMA_FORGET_PASSWORD,
    FORM_VALIDATION_SCHEMA_RESET_PASSWORD,
    FORM_VALIDATION_SCHEMA_ADD_GRADE,
    FORM_VALIDATION_SCHEMA_ADD_Subject,
  };
}

export default UseFormValidation;
