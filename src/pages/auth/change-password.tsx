import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
import { changePassword, logIn } from "../../state/act/actAuth";
import UseThemMode from "../../hooks/use-theme-mode";
import PasswordField from "../../components/formUI/password";
import withGuard from "../../utils/withGuard";

function ChangePassword() {
  const { INITIAL_FORM_STATE_CHANGE_PASSWORD } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD } = UseFormValidation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { themeMode } = UseThemMode();
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm">
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_CHANGE_PASSWORD,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD}
            onSubmit={async (values) => {
              dispatch(
                changePassword({
                  oldPassword: values.currentPassword,
                  newPassword: values.newPassword,
                })
              )
                .unwrap()
                .then(() => {
                  toast.success(t("change-password-success")); // Toastify success
                  navigate("/");
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: t("change-password-error-title"),
                    text: error?.message || t("change-password-error-message"),
                  });
                });
            }}
          >
            <div>
              <FormWrapper>
                <HeadingElement mode={themeMode}>
                  {t("change-password-now")}
                </HeadingElement>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <PasswordField
                      name="currentPassword"
                      label={t("current-password")}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {" "}
                    <PasswordField
                      name="newPassword"
                      label={t("new-password")}
                    />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("change-password")}</ButtonWrapper>{" "}
              </FormWrapper>
            </div>
          </Formik>
        </ContainerFormWrapper>
      </div>
      <Footer />
    </>
  );
}

export default withGuard(ChangePassword);
