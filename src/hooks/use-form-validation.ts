import * as Yup from "yup";
import { ref } from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";

function UseFormValidation() {
  const FORM_VALIDATION_SCHEMA_LOGIN = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(2, "Minimum number of characters is 2"),

    password: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
  });

  const FORM_VALIDATION_SCHEMA_SIGNUP = Yup.object().shape({
    firstname: Yup.string()
      .required("First Name is required")
      .min(2, "Minimum number of characters is 2"),
    lastname: Yup.string()
      .required("Last Name is required")
      .min(2, "Minimum number of characters is 2"),
    username: Yup.string()
      .required("Username is required")
      .min(2, "Minimum number of characters is 2"),

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
    phone: Yup.string()
      .required("Phone number is required")
      .test("is-valid", "Phone number is not valid", (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(`+${value}`);
        return phoneNumber ? phoneNumber.isValid() : false;
      }),
  });

  return {
    FORM_VALIDATION_SCHEMA_LOGIN, // This is for login
    FORM_VALIDATION_SCHEMA_SIGNUP, // This is for signup, make sure the name is consistent
  };
}
export default UseFormValidation;
