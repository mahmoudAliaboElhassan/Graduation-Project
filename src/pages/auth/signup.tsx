// import { Form, Formik } from "formik";
// import { Link } from "react-router-dom";
// import {Container,Typography} from "@mui/material";

// import styles from "./form.module.css";
// import TextFieldWrapper from "../../components/formUI/textField";
// import ButtonWrapper from "../../components/formUI/submit";
// import Footer from "../../components/footer";
// import PhoneForm from "../../components/formUI/phoneNumber";
// import UseInitialValues from "../../hooks/use-initial-values";
// import UseFormValidation from "../../hooks/use-form-validation";
// import { useTranslation } from "react-i18next";
// import UseMediaQuery from "../../hooks/use-media-query";

// function SignUp() {
//   const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues();
//   const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation();
//   const { t } = useTranslation();
//   const isSm = UseMediaQuery({ query: "(max-width: 300px)" });

//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           minHeight: "100vh",
//         }}
//       >
//         <Container className={styles.formWrapper}>
//           <Formik
//             initialValues={{
//               ...INITIAL_FORM_STATE_SIGNUP,
//             }}
//             validationSchema={FORM_VALIDATION_SCHEMA_SIGNUP}
//             onSubmit={async (values) => {
//               console.log(values);
//               console.log(FORM_VALIDATION_SCHEMA_SIGNUP);
//               // setLoading(true);
//               // const { confirmPassword, ...other } = values;
//               // try {
//               //   const user = await axiosInstance.post("/api/users/signup", other);
//               //   toast.success("You Have Created Account Successfully!");
//               //   console.log(user.data);
//               //   router.push("/login");
//               //   setLoading(false);
//               // } catch (error: any) {
//               //   setLoading(false);
//               //   Swal.fire({
//               //     title: "Error in Logging",
//               //     text: error.response.data.message,
//               //     icon: "error",
//               //     confirmButtonText: "ok",
//               //   });
//               // }
//             }}
//           >
//             <Typography
//               component={"h2"}
//               style={{ textShadow: "0px 2px 9px rgb(151 26 26 / 50%)" }}
//             >
//               {t("signup-now")}
//             </Typography>
//             <Form>
//               <div>
//                 <div>
//                   {/* <TextFieldWrapper name="firstname" label={t("firstname")} /> */}
//                 </div>
//                 <div>
//                   {/* <TextFieldWrapper name="lastname" label={t("lastname")} /> */}
//                 </div>
//               </div>
//               {/* <TextFieldWrapper name="email" label={t("email")} /> */}
//               {/* <TextFieldWrapper name="email" label="Email" /> */}
//               {/* <TextFieldWrapper name="password" label={t("password")} /> */}
//               {/* <TextFieldWrapper
//                 name="confirmPassword"
//                 label={t("confirm-password")}
//               /> */}
//               {/* <PhoneForm name="phone" /> */}
//               {/* <ButtonWrapper>{t("signup")}</ButtonWrapper> */}
//               <div className="text-center text-lg-start mt-1 mt-lg-0">
//                 {t("already-have-account")}
//                 <Link
//                   to="/login"
//                   title="Login to your Account"
//                   style={{ borderBottom: "1px solid white", marginTop: "8px" }}
//                 >
//                   {t("login")}{" "}
//                 </Link>
//               </div>
//             </Form>
//           </Formik>
//         </Container>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SignUp;
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

function SignUp() {
  const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation();
  const { t } = useTranslation();
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
              <HeadingElement> {t("signup-now")}</HeadingElement>
              <Form>
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
                    {" "}
                    <TextFieldWrapper name="password" label={t("password")} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {" "}
                    <TextFieldWrapper
                      name="confirmPassword"
                      label={t("confirm-password")}
                    />{" "}
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    {" "}
                    <PhoneForm name="phone" />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("signup")}</ButtonWrapper>
                {/* <div className="text-center text-lg-start mt-1 mt-lg-0">
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
                </div> */}
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
