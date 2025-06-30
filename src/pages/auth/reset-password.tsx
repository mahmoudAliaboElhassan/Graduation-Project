import { Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { logIn, resetPassword } from "../../state/act/actAuth";
import UseThemMode from "../../hooks/use-theme-mode";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import PasswordField from "../../components/formUI/password";
import withGuard from "../admin/index";

function ResetPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { INITIAL_FORM_STATE_RESET_PASSWORD } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_RESET_PASSWORD } = UseFormValidation();
  const { themeMode } = UseThemMode();
  const { token } = useParams();
  console.log("token", token);
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm">
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_RESET_PASSWORD,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_RESET_PASSWORD}
            onSubmit={async (values) => {
              console.log(values);
              dispatch(
                resetPassword({
                  token: token || "",
                  email: localStorage.getItem("email-resetted") || "",
                  password: values.password,
                })
              )
                .unwrap()
                .then(() => {
                  {
                    toast.success(t("reset-success"), {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                  navigate("/login");
                })
                .catch((error: AxiosError) => {
                  Swal.fire({
                    title: t("error-reset-password"),
                    text: t("error-reset-password-text"),
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
                <HeadingElement>{t("reset-password")}</HeadingElement>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <PasswordField name="password" label={t("password")} />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("reset-password")}</ButtonWrapper>{" "}
              </FormWrapper>
            </motion.div>
          </Formik>
        </ContainerFormWrapper>
      </div>
    </>
  );
}

export default ResetPassword;
