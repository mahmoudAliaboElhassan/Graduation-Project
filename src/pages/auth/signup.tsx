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
import { useAppDispatch } from "../../hooks/redux";
import { signUp } from "../../state/act/actAuth";
import UseRoles from "../../hooks/use-roles";
import SelectComponent from "../../components/formUI/select";
import { useState, useEffect } from "react";

const FormFields = () => {
  const { values } = useFormikContext() as any; // Access Formik context to get `values`
  const [type, setType] = useState<string>("");
  const { Roles } = UseRoles();
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="firstname" label="First Name" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="lastname" label="Last Name" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="email" label="Email" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="password" label="Password" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="confirmPassword" label="Confirm Password" />
        </Grid>
        {/* <Grid size={{ xs: 12 }}>
          <PhoneForm name="phone" />
        </Grid> */}
        <Grid size={{ xs: 12 }}>
          <SelectComponent name="type" options={Roles} label="Select Role" />
        </Grid>

        <Grid size={{ xs: 12 }}>
          {values.type === 0 ? (
            <SelectComponent
              name="grade"
              options={Roles}
              label="Select Grade"
            />
          ) : (
            values.type === 1 && (
              <SelectComponent
                name="subject"
                options={Roles}
                label="Select Subject"
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
        <Container maxWidth="sm" className={styles.formWrapper}>
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
              <HeadingElement>{t("signup-now")}</HeadingElement>
              <Form>
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
              </Form>
            </div>
          </Formik>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
