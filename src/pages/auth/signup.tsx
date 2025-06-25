import { Form, Formik, useFormikContext } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
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
import { getAllGrades, getAllSubjects, signUp } from "../../state/act/actAuth";
import UseRoles from "../../hooks/use-roles";
import SelectComponent from "../../components/formUI/select";
import signupPage from "../../assets/signUpImage.jpeg.jpg";
import { isToastActive } from "react-toastify/dist/core/store";
import UseGrades from "../../hooks/use-grades";
import UseSubjects from "../../hooks/use-subjects";
import PasswordField from "../../components/formUI/password";
import withGuard from "../../utils/withGuard";
import { useEffect } from "react";

const FormFields = () => {
  const { values } = useFormikContext() as any;
  const { Roles } = UseRoles();
  const { grades } = UseGrades();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { allSubjects, loadingGetAllSubjects, loadingGetAllGrades, allGrades } =
    useAppSelector((state) => state.auth);
  const { mymode } = useAppSelector((state) => state.mode);
  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(getAllGrades());
  }, []);

  const subjectSelect = allSubjects.map((subject) => ({
    text: subject,
    value: subject,
  }));

  const gradesSelect = allGrades.map((grade) => ({
    text: grade.gradeName,
    value: grade.gradeId.toString(),
  }));

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
            <Box sx={{ position: "relative" }}>
              <SelectComponent
                name="gradeUser"
                options={gradesSelect}
                label={t("select-grade")}
                disabled={loadingGetAllGrades}
              />
              {loadingGetAllGrades && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 35,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                >
                  <CircularProgress
                    size={20}
                    sx={{
                      color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    }}
                  />
                </Box>
              )}
            </Box>
          ) : (
            values.type === "1" && (
              <Box sx={{ position: "relative" }}>
                <SelectComponent
                  name="subject"
                  options={subjectSelect}
                  label={t("select-subject")}
                  disabled={loadingGetAllSubjects}
                />
                {loadingGetAllSubjects && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 35,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress
                      size={20}
                      sx={{
                        color: mymode === "light" ? "#c31432" : "#ff6b9d",
                      }}
                    />
                  </Box>
                )}
              </Box>
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
  const { error, loadingGetAllSubjects, loadingGetAllGrades } = useAppSelector(
    (state) => state.auth
  );

  // Check if any loading state is active (but separate select loading from general loading)
  const isGeneralLoading = false; // You can add other loading states here like form submission loading
  const isSelectLoading = loadingGetAllSubjects || loadingGetAllGrades;

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
          {/* Loading Overlay - Only show for general loading, not select loading */}
          {isGeneralLoading && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                  mymode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(26, 26, 46, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                backdropFilter: "blur(5px)",
              }}
            >
              <Box textAlign="center">
                <CircularProgress
                  size={50}
                  sx={{
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    fontWeight: "bold",
                  }}
                >
                  {loadingGetAllSubjects && loadingGetAllGrades
                    ? t("loading-data") || "Loading data..."
                    : loadingGetAllSubjects
                    ? t("loading-subjects") || "Loading subjects..."
                    : t("loading-grades") || "Loading grades..."}
                </Typography>
              </Box>
            </Box>
          )}

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
                  grade: `${values.gradeUser}` || "1",
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
                <ButtonWrapper disabled={isSelectLoading}>
                  {t("signup")}
                </ButtonWrapper>
                <div className="text-center mt-2">
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
