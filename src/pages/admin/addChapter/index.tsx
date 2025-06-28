import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import UseThemMode from "../../../hooks/use-theme-mode";
import UseFormValidation from "../../../hooks/use-form-validation";
import { ContainerFormWrapper, FormWrapper } from "../../../styles/forms";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useTranslation } from "react-i18next";
import UseInitialValues from "../../../hooks/use-initial-values";
import { AxiosError } from "axios";
import { HeadingElement } from "../../../styles/heading";
import TextFieldWrapper from "../../../components/formUI/textField";
import ButtonWrapper from "../../../components/formUI/submit";
import withGuard from "../../../utils/withGuard";
import Swal from "sweetalert2";
import { addChapter } from "../../../state/act/actAdmin";
import { useEffect, useState } from "react";
import { getAllGrades, getSubjects } from "../../../state/act/actAuth";
import SelectComponent from "../../../components/formUI/select";

// Interface for the chapter data
export interface ChapterData {
  grade: number;
  subject: string;
  chapterNumber: number;
  chapterName: string;
}

function AddChapter() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { INITIAL_FORM_STATE_ADD_CHAPTER } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ADD_CHAPTER } = UseFormValidation();
  const { themeMode } = UseThemMode();
  const { loadingGetAllGrades, allGrades, subjects } = useAppSelector(
    (state) => state.auth
  );

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

  const steps = [
    t("select-grade") || "Select Grade",
    t("select-subject") || "Select Subject",
    t("chapter-details") || "Chapter Details",
  ];

  useEffect(() => {
    dispatch(getAllGrades());
  }, [dispatch]);

  const gradesSelect = allGrades.map((grade) => ({
    text: grade.gradeName,
    value: grade.gradeId.toString(),
  }));

  const handleNext = async (values: any, setTouched: any, setErrors: any) => {
    // Validation for each step
    if (activeStep === 0 && !values.gradesSelect) {
      setTouched({ gradesSelect: true });
      setErrors({
        gradesSelect: t("grade-required") || "Grade is required",
      });
      return;
    }

    if (activeStep === 0 && values.gradesSelect) {
      // Load subjects for the selected grade
      setIsLoadingSubjects(true);
      try {
        await dispatch(
          getSubjects({ grade: Number(values.gradesSelect) })
        ).unwrap();
      } catch (error: any) {
        console.error("Error loading subjects:", error);
        toast.error(error?.response?.data, {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingSubjects(false);
      }
    }

    if (activeStep === 1 && !values.subjectQetQuestions) {
      setTouched({ subjectQetQuestions: true });
      setErrors({
        subjectQetQuestions: t("subject-required") || "Subject is required",
      });
      return;
    }

    if (activeStep === 2) {
      if (!values.chapterNumber) {
        setTouched({ chapterNumber: true });
        setErrors({
          chapterNumber:
            t("chapter-number-required") || "Chapter number is required",
        });
        return;
      }
      if (!values.chapterName) {
        setTouched({ chapterName: true });
        setErrors({
          chapterName: t("chapter-name-required") || "Chapter name is required",
        });
        return;
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      const chapterData: ChapterData = {
        grade: Number(values.gradesSelect),
        subject: values.subjectQetQuestions,
        chapterNumber: Number(values.chapterNumber),
        chapterName: values.chapterName,
      };

      console.log("Submitting chapter data:", chapterData);

      const result = await dispatch(addChapter(chapterData)).unwrap();

      toast.success(t("chapter-added") || "Chapter added successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form and navigate back after a short delay
      setTimeout(() => {
        resetForm();
        setActiveStep(0);
      }, 1000);
    } catch (error: any) {
      console.error("Error adding chapter:", error);

      if (error?.status === 401) {
        Swal.fire({
          title: t("error-add-chapter") || "Error adding chapter",
          text:
            t("error-add-chapter-text") ||
            "You don't have permission to add chapters",
          icon: "error",
          confirmButtonText: t("ok") || "OK",
        });
      } else {
        toast.error(error, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContainerFormWrapper maxWidth="sm">
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE_ADD_CHAPTER,
        }}
        validationSchema={FORM_VALIDATION_SCHEMA_ADD_CHAPTER}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setTouched, setErrors, setFieldValue }) => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <FormWrapper>
              {/* Loading Overlay */}
              {(isLoadingSubjects || loadingGetAllGrades) && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    borderRadius: 1,
                  }}
                >
                  <Box textAlign="center">
                    <CircularProgress size={50} sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {isSubmitting
                        ? t("adding-chapter") || "Adding Chapter..."
                        : loadingGetAllGrades
                        ? t("loading-grades") || "Loading Grades..."
                        : t("loading-subjects") || "Loading Subjects..."}
                    </Typography>
                  </Box>
                </Box>
              )}

              <HeadingElement>
                {t("add-chapter-now") || "Add New Chapter"}
              </HeadingElement>

              {/* Stepper */}
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Form>
                <Grid container>
                  {/* Step 0: Select Grade */}
                  {activeStep === 0 && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                        {t("select-grade-description") ||
                          "Choose the grade level for the new chapter"}
                      </Typography>
                      <SelectComponent
                        name="gradesSelect"
                        options={gradesSelect}
                        label={t("select-grade") || "Select Grade"}
                        disabled={loadingGetAllGrades}
                      />
                    </Grid>
                  )}

                  {/* Step 1: Select Subject */}
                  {activeStep === 1 && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                        {t("select-subject-description") ||
                          "Choose the subject for the new chapter"}
                      </Typography>
                      <SelectComponent
                        name="subjectQetQuestions"
                        options={subjects as any}
                        label={t("select-subject") || "Select Subject"}
                        disabled={isLoadingSubjects}
                      />
                    </Grid>
                  )}

                  {/* Step 2: Chapter Details */}
                  {activeStep === 2 && (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{ mb: 2, opacity: 0.7 }}
                        >
                          {t("chapter-details-description") ||
                            "Enter the chapter number and name"}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextFieldWrapper
                          name="chapterNumber"
                          label={t("chapter-number") || "Chapter Number"}
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextFieldWrapper
                          name="chapterName"
                          label={t("chapter-name") || "Chapter Name"}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                {/* Navigation buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{ flex: 1 }}
                  >
                    {t("back") || "Back"}
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <ButtonWrapper disabled={isSubmitting} sx={{ flex: 1 }}>
                      {isSubmitting
                        ? t("adding-chapter") || "Adding Chapter..."
                        : t("addChapter") || "Add Chapter"}
                    </ButtonWrapper>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleNext(values, setTouched, setErrors)}
                      disabled={isLoadingSubjects || loadingGetAllGrades}
                      sx={{ flex: 1 }}
                    >
                      {t("next") || "Next"}
                    </Button>
                  )}
                </Box>
              </Form>
            </FormWrapper>
          </motion.div>
        )}
      </Formik>
    </ContainerFormWrapper>
  );
}

export default withGuard(AddChapter);
