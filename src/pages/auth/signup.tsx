import { Form, Formik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./form.module.css";
import TextFieldWrapper from "../../components/formUI/textField";
import ButtonWrapper from "../../components/formUI/submit";
import Footer from "../../components/footer";
import PhoneForm from "../../components/formUI/phoneNumber";
import UseInitialValues from "../../hooks/use-initial-values";
import UseFormValidation from "../../hooks/use-form-validation";
import { useTranslation } from "react-i18next";

function SignUp() {
  const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation();
  const { t } = useTranslation();
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE_SIGNUP,
          }}
          validationSchema={FORM_VALIDATION_SCHEMA_SIGNUP}
          onSubmit={async (values) => {
            console.log(values);
            console.log(FORM_VALIDATION_SCHEMA_SIGNUP);
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
          <Container fluid="sm" className={styles.formWrapper}>
            <h2
              className="text-center mb-4"
              style={{ textShadow: "0px 2px 9px rgb(151 26 26 / 50%)" }}
            >
              {t("signup-now")}
            </h2>{" "}
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <TextFieldWrapper name="firstname" label={t("firstname")} />
                </Col>
                <Col xs={12} md={6}>
                  <TextFieldWrapper name="lastname" label={t("lastname")} />
                </Col>
              </Row>
              <TextFieldWrapper name="username" label={t("username")} />
              {/* <TextFieldWrapper name="email" label="Email" /> */}
              <TextFieldWrapper name="password" label={t("password")} />
              <TextFieldWrapper
                name="confirmPassword"
                label={t("confirm-password")}
              />
              <PhoneForm name="phone" />
              <ButtonWrapper>{t("signup")}</ButtonWrapper>
              <div className="text-center text-lg-start mt-1 mt-lg-0">
                {t("already-have-account")}
                <Link
                  to="/login"
                  title="Login to your Account"
                  style={{ borderBottom: "1px solid white", marginTop: "8px" }}
                >
                  {t("login")}{" "}
                </Link>
              </div>
            </Form>
          </Container>
        </Formik>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
