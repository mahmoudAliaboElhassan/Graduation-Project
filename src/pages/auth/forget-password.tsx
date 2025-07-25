import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import styles from "./form.module.css";
import TextFieldWrapper from "../../components/formUI/textField";
import ButtonWrapper from "../../components/formUI/submit";
import Footer from "../../components/footer";
import PhoneForm from "../../components/formUI/phoneNumber";
import UseInitialValues from "../../hooks/use-initial-values";
import UseFormValidation from "../../hooks/use-form-validation";
import { useTranslation } from "react-i18next";
import { HeadingElement } from "../../styles/heading";
import { FormWrapper, ContainerFormWrapper } from "../../styles/forms";
import { useAppDispatch } from "../../hooks/redux";
import { forgetPassword, logIn } from "../../state/act/actAuth";
import UseThemMode from "../../hooks/use-theme-mode";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import withGuard from "../../utils/withGuard";

function ForgetPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { INITIAL_FORM_STATE_FORGET_PASSWORD } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_FORGET_PASSWORD } = UseFormValidation();
  const { themeMode } = UseThemMode();
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm">
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_FORGET_PASSWORD,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_FORGET_PASSWORD}
            onSubmit={async (values) => {
              console.log(values);
              dispatch(forgetPassword({ email: values.email }))
                .unwrap()
                .then(() => {
                  localStorage.setItem("email-resetted", values.email);
                  {
                    toast.success(t("email-sent"), {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                  navigate("/");
                })
                .catch((error: AxiosError) => {
                  Swal.fire({
                    title: t("error-email-sent"),
                    text: t("error-email-sent-text"),
                    icon: "error",
                    confirmButtonText: t("ok"),
                  });
                });
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormWrapper>
                <HeadingElement>{t("forget-password")}</HeadingElement>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <TextFieldWrapper name="email" label={t("email")} />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("get-reset")}</ButtonWrapper>{" "}
              </FormWrapper>
            </motion.div>
          </Formik>
        </ContainerFormWrapper>
      </div>
    </>
  );
}

export default withGuard(ForgetPassword);
