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
import { logIn } from "../../state/act/actAuth";
import UseThemMode from "../../hooks/use-theme-mode";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { INITIAL_FORM_STATE_LOGIN } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_LOGIN } = UseFormValidation();
  const { themeMode } = UseThemMode();
  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm">
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_LOGIN,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_LOGIN}
            onSubmit={async (values) => {
              console.log(values);
              dispatch(
                logIn({ email: values.email, password: values.password })
              )
                .unwrap()
                .then(() => {
                  {
                    toast.success(t("login-success"), {
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
                  if (error?.response?.status === 401) {
                    Swal.fire({
                      title: t("error-login"),
                      text: t("error-login-text"),
                      icon: "error",
                      confirmButtonText: t("ok"),
                    });
                  }
                }); // setLoading(true);
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
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormWrapper>
                <HeadingElement>{t("login-now")}</HeadingElement>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <TextFieldWrapper name="email" label={t("email")} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {" "}
                    <TextFieldWrapper
                      name="password"
                      label={t("password")}
                      type="password"
                    />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("login")}</ButtonWrapper>{" "}
                <div className="text-center  mt-2">
                  {t("do-not-have-account")}
                  <Link
                    to="/signup"
                    title="Create Account"
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    {t("signup")}{" "}
                  </Link>
                </div>
              </FormWrapper>
            </motion.div>
          </Formik>
        </ContainerFormWrapper>
      </div>
    </>
  );
}

export default Login;
