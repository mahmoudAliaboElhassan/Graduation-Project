import React from "react";
import { useField, useFormikContext } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "../error-style.module.css";
import { useTranslation } from "react-i18next";

const PhoneForm = ({ name }: { name: string }) => {
  const { errorMessage } = styles;
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: "8px" }}>
      <label htmlFor="phone" style={{ color: "gray" }}>
        {t("phone")}:
      </label>
      <PhoneInput
        country={"us"}
        value={field.value} // Ensure this is linked to Formik's value
        onChange={(phone) => setFieldValue(name, phone)} // Set Formik's field value
        onBlur={() => setFieldTouched(name, true)} // Mark field as touched
        inputProps={{
          name: "phone",
          required: true,
        }}
        inputStyle={{
          width: "100%",
          fontSize: "16px",
          paddingTop: " 25px",
          paddingBottom: "25px",
          background: "transparent",
        }}
        buttonStyle={{
          backgroundColor: "#f0f0f0",
        }}
        dropdownStyle={{
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
        }}
      />
      {meta.touched && meta.error ? (
        <div className={errorMessage}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PhoneForm;
