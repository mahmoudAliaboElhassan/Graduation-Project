import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import UseThemMode from "../../../hooks/use-theme-mode";
import UseFormValidation from "../../../hooks/use-form-validation";
import { ContainerFormWrapper, FormWrapper } from "../../../styles/forms";
import { useAppDispatch } from "../../../hooks/redux";
import { useTranslation } from "react-i18next";
import UseInitialValues from "../../../hooks/use-initial-values";
import { AxiosError } from "axios";
import { HeadingElement } from "../../../styles/heading";
import TextFieldWrapper from "../../../components/formUI/textField";
import ButtonWrapper from "../../../components/formUI/submit";
import withGuard from "../../../utils/withGuard";
import Swal from "sweetalert2";
import { addGrade } from "../../../state/act/actAdmin";

function AddGrade() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { INITIAL_FORM_STATE_ADD_GRADE } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ADD_GRADE } = UseFormValidation();
  const { themeMode } = UseThemMode();
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm">
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE_ADD_GRADE,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_ADD_GRADE}
            onSubmit={async (values) => {
              console.log(values);
              dispatch(addGrade({ grade: values.grade }))
                .unwrap()
                .then(() => {
                  {
                    toast.success(t("grade-added"), {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                })
                .catch((error: AxiosError) => {
                  if (error?.response?.status === 401) {
                    Swal.fire({
                      title: t("error-add-grade"),
                      text: t("error-add-grade-text"),
                      icon: "error",
                      confirmButtonText: t("ok"),
                    });
                  }
                });
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormWrapper>
                <HeadingElement>{t("add-grade-now")}</HeadingElement>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <TextFieldWrapper name="grade" label={t("grade")} />
                  </Grid>
                </Grid>
                <ButtonWrapper>{t("add-grade")}</ButtonWrapper>{" "}
              </FormWrapper>
            </motion.div>
          </Formik>
        </ContainerFormWrapper>
      </div>
    </>
  );
}

export default withGuard(AddGrade);
