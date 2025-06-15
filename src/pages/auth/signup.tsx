import { Form, Formik, useFormikContext } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signUp } from "../../state/act/actAuth";
import UseRoles from "../../hooks/use-roles";
import SelectComponent from "../../components/formUI/select";
import signupPage from "../../assets/signUpImage.jpeg.jpg";
import { isToastActive } from "react-toastify/dist/core/store";
import UseGrades from "../../hooks/use-grades";
import UseSubjects from "../../hooks/use-subjects";
import PasswordField from "../../components/formUI/password";
import withGuard from "../../utils/withGuard";

const FormFields = () => {
  const { values } = useFormikContext() as any;
  const { Roles } = UseRoles();
  const { grades } = UseGrades();
  const { subjects } = UseSubjects();
  const { t } = useTranslation();
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="name" label={t("full-name")} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextFieldWrapper name="email" label={t("email")} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <PasswordField name="password" label={t("password")} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <PasswordField name="confirmPassword" label={t("confirm-password")} />
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
          {values.type === "0" ? (
            <SelectComponent
              name="grade"
              options={grades}
              label={t("select-grade")}
            />
          ) : (
            values.type === "1" && (
              <SelectComponent
                name="subject"
                options={subjects}
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation();
  const { mymode } = useAppSelector((state) => state.mode);
  const { error } = useAppSelector((state) => state.auth);
  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "120vh",
        }}
      >
        <ContainerFormWrapper
          maxWidth="sm"
          // backgroundImage={signupPage}
        >
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_SIGNUP,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_SIGNUP}
            onSubmit={async (values) => {
              console.log(values);
              const { confirmPassword, ...other } = values;
              dispatch(
                signUp({
                  name: values.name,
                  password: values.password,
                  email: values.email,
                  type: +values.type,
                  grade: `${values.grade}` || "1",
                  subject: `${values.subject}`,
                })
              )
                .unwrap()
                .then(() => {
                  toast.success(t("user-created"), {
                    theme: mymode,
                  });
                  navigate("/login");
                })
                .catch((err: AxiosError) => {
                  Swal.fire({
                    title: "Error in creating Account",
                    text: error,
                    icon: "error",
                    confirmButtonText: "ok",
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
                <HeadingElement mode={mymode}>{t("signup-now")}</HeadingElement>
                <FormFields />
                <ButtonWrapper>{t("signup")}</ButtonWrapper>
                <div className="text-center  mt-2">
                  {t("already-have-account")}
                  <Link
                    to="/login"
                    title="Login to your Account"
                    style={{
                      // marginTop: "8px",
                      fontWeight: "700",
                    }}
                  >
                    {t("login")}
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

export default withGuard(SignUp);
