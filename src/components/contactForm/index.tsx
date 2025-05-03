import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
 import Swal from "sweetalert2";
import emailjs from "emailjs-com";

import TextFieldWrapper from "../../components/formUI/textField";
import ButtonWrapper from "../../components/formUI/submit";

import UseInitialValues from "../../hooks/use-initial-values";
import UseFormValidation from "../../hooks/use-form-validation";
import UseThemMode from "../../hooks/use-theme-mode";

import { HeadingElement } from "../../styles/heading";
import { FormWrapper } from "../../styles/forms";
import { useAppDispatch } from "../../hooks/redux";
import { InitialValuesContacts } from "../../utils/types/initialValues";

function ContactForm() {
  const { t } = useTranslation();
   const { INITIAL_FORM_STATE_CONTACT } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_CONTACTS } = UseFormValidation();
  const { themeMode } = UseThemMode();

  const sendEmail = (formValues: InitialValuesContacts) => {
    const templateParams = {
      email: formValues.email,
      title: formValues.title,
      message: formValues.message,
      name: formValues.name,
    };

    // console.log("Service ID:", process.env.REACT_APP_SERVICE_ID);
    // console.log("Template ID:", process.env.REACT_APP_TEMPLATE_ID);
    // console.log("User ID:", process.env.REACT_APP_USER_ID);

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID || "",
        process.env.REACT_APP_TEMPLATE_ID || "",
        templateParams,
        process.env.REACT_APP_USER_ID || ""
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        toast.success(t("sent-success"), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: themeMode,
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        Swal.fire({
          title: t("error-sending-message"),
          icon: "error",
          confirmButtonText: t("ok"),
        });
      });
  };

  return (
    <>
      <div
        style={{
          boxShadow:
            "1px -10px 11px 6px rgba(0, 0, 0, 0.2), -8px 4px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);",
        }}
      >
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE_CONTACT,
          }}
          validationSchema={FORM_VALIDATION_SCHEMA_CONTACTS}
          onSubmit={async (values) => {
            console.log(values);
            sendEmail(values);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <FormWrapper style={{ border: "none" }}>
              <HeadingElement mode={themeMode}>{t("contact-heading")}</HeadingElement>
              <Grid container spacing={1}>
                <Grid size={{ xs: 6 }}>
                  <TextFieldWrapper name="email" label={t("email")} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextFieldWrapper name="name" label={t("name")} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextFieldWrapper name="title" label={t("msg-title")} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextFieldWrapper name="message" label={t("message")} />
                </Grid>
              </Grid>
              <ButtonWrapper>{t("contact")}</ButtonWrapper>{" "}
            </FormWrapper>
          </motion.div>
        </Formik>
        {/* </ContainerFormWrapper> */}
      </div>
    </>
  );
}

export default ContactForm;
