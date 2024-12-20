import { Form, Formik, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

import styles from "./form.module.css";
import TextFieldWrapper from "../../components/formUI/textField";
import ButtonWrapper from "../../components/formUI/submit";
import Footer from "../../components/footer";
import PhoneForm from "../../components/formUI/phoneNumber";
import UseInitialValues from "../../hooks/use-initial-values";
import UseFormValidation from "../../hooks/use-form-validation";
import { useTranslation } from "react-i18next";
import { HeadingElement } from "../../styles/heading";
import { FormWrapper ,ContainerFormWrapper} from "../../styles/forms";
import { useAppDispatch } from "../../hooks/redux";
import { signUp } from "../../state/act/actAuth";
import UseRoles from "../../hooks/use-roles";
import SelectComponent from "../../components/formUI/select";

const FormFields = () => {
  const { values } = useFormikContext() as any; // Access Formik context to get `values`
  const { Roles } = UseRoles();
  const { t } = useTranslation();
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="firstname" label={t("firstname")} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="lastname" label={t("lastname")} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="email" label={t("email")} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="password" label={t("password")} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper
            name="confirmPassword"
            label={t("confirm-password")}
          />
        </Grid>
        {/* <Grid size={{ xs: 12 }}>
          <PhoneForm name="phone" />
        </Grid> */}
        <Grid size={{ xs: 12 }}>
          <SelectComponent
            name="type"
            options={Roles}
            label={t("select-role")}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          {values.type === 0 ? (
            <SelectComponent
              name="grade"
              options={Roles}
              label={t("select-grade")}
            />
          ) : (
            values.type === 1 && (
              <SelectComponent
                name="subject"
                options={Roles}
                label={t("select-subject")}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

function SignUp() {
  const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
   return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm"  >
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_SIGNUP,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_SIGNUP}
            onSubmit={async (values) => {
              console.log(values);
              const { confirmPassword, ...other } = values;
              try {
                dispatch(
                  signUp({
                    FirstName: values.firstname,
                    LastName: values.lastname,
                    password: values.password,
                    email: values.email,
                    type: values.type,
                    grade: "values.grade",
                    subject: "values.subject",
                  })
                );
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            <div>
              <FormWrapper>
              <HeadingElement>{t("signup-now")}</HeadingElement>
                <FormFields /> <ButtonWrapper>{t("signup")}</ButtonWrapper>
                <div className="text-center text-lg-start mt-1 mt-lg-0">
                  {t("already-have-account")}
                  <Link
                    to="/login"
                    title="Login to your Account"
                    style={{ marginTop: "8px" }}
                  >
                    {t("login")}
                  </Link>
                </div>
              </FormWrapper>
            </div>
          </Formik>
        </ContainerFormWrapper>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
