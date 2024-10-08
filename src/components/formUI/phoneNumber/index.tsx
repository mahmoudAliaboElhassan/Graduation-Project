import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import "./phoneNumber.css";
import ButtonWrapper from "../submit/submitBtn";
import styles from "../error-style.module.css";

const PhoneForm = () => {
  const { errorMessage } = styles;
  return (
    <Formik
      initialValues={{
        phone: "",
      }}
      validationSchema={Yup.object({
        phone: Yup.string()
          .required("Phone number is required")
          .test("is-valid", "Phone number is not valid", (value) => {
            if (!value) return false; // Ensure value exists
            const phoneNumber = parsePhoneNumberFromString(`+${value}`);
            return phoneNumber ? phoneNumber.isValid() : false;
          }),
      })}
      onSubmit={(values, { resetForm }) => {
        alert(`Phone number submitted: ${values.phone}`);
        resetForm(); // Optional: Reset form after submission
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <PhoneInput
              country={"us"}
              value={values.phone}
              onChange={(phone) => setFieldValue("phone", phone)}
              onBlur={() => setFieldTouched("phone", true)}
              inputProps={{
                name: "phone",
                required: true, // Corrected spelling
                // You can add other input props here
              }}
              inputStyle={{
                width: "300px",
                fontSize: "16px",
              }}
              buttonStyle={{
                backgroundColor: "#f0f0f0",
              }}
              dropdownStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
              }}
            />
            {/* Display validation errors */}
            {touched.phone && errors.phone ? (
              <div className={errorMessage}>{errors.phone}</div>
            ) : null}
          </div>
          <ButtonWrapper loading={false}>Submit</ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default PhoneForm;
