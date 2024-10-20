import { Form, Formik } from "formik";
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

function Login() {
  const { INITIAL_FORM_STATE_LOGIN } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_LOGIN } = UseFormValidation();
  const { t } = useTranslation();
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Container maxWidth="sm" className={styles.formWrapper}>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_LOGIN,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_LOGIN}
            onSubmit={async (values) => {
              console.log(values);
              // setLoading(true);
              // const { confirmPassword, ...other } = values;
              // try {
              //   const user = await axiosInstance.post("/api/users/signup", other);
              //   toast.success("You Have Created Account Successfully!");
              //   console.log(user.data);
              //   router.push("/login");
              //   setLoading(false);
              // } catch (error: any) {
              //   setLoading(false);
              //   Swal.fire({
              //     title: "Error in Logging",
              //     text: error.response.data.message,
              //     icon: "error",
              //     confirmButtonText: "ok",
              //   });
              // }
            }}
          >
            <div>
              <HeadingElement>{t("login-now")}</HeadingElement>
              <Form>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <TextFieldWrapper name="email" label={t("email")} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {" "}
                    <TextFieldWrapper name="password" label={t("password")} />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("login")}</ButtonWrapper>

                <div className="text-center text-lg-start mt-1 mt-lg-0">
                  {t("do-not-have-account")}
                  <Link
                    to="/signup"
                    title="Create Account"
                    style={{
                      borderBottom: "1px solid white",
                      marginTop: "8px",
                    }}
                  >
                    {t("signup")}{" "}
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

export default Login;
