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
import { addChapter, addGradeSujects } from "../../../state/act/actAdmin";
import { useEffect, useState } from "react";
import {
  getAllGrades,
  getAllSubjects,
  getSubjects,
} from "../../../state/act/actAuth";
import SelectComponent from "../../../components/formUI/select";
import { GradeSubjects } from "../../../utils/types/DTO";
import MultiSelectComponent from "../../../components/formUI/select/multiple";

// Interface for the chapter data

function AddGradeSubjects() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { INITIAL_FORM_STATE_ADD_SUBJECTS } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ADD_SUBJECTS } = UseFormValidation();
  const { themeMode } = UseThemMode();
  const { loadingGetAllGrades, allGrades, allSubjects } = useAppSelector(
    (state) => state.auth
  );
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

  const steps = [
    t("select-grade") || "Select Grade",
    t("select-subjects") || "Select Subjects", // Updated to plural
  ];

  useEffect(() => {
    dispatch(getAllGrades());
  }, [dispatch]);

  const gradesSelect = allGrades.map((grade) => ({
    text: grade.gradeName,
    value: grade.gradeId.toString(),
  }));
  const subjectSelect = allSubjects.map((subject) => ({
    text: subject,
    value: subject,
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
        await dispatch(getAllSubjects()).unwrap();
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

    // Updated validation for subjects array
    if (
      activeStep === 1 &&
      (!values.subjects || values.subjects.length === 0)
    ) {
      setTouched({ subjects: true });
      setErrors({
        subjects: t("subjects-required") || "At least one subject is required",
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
      const subjectGrades: GradeSubjects = {
        subjectNames: values.subjects, // This will now be an array of strings
        grade: Number(values.gradesSelect),
      };

      console.log("Submitting subjects data:", subjectGrades);

      const result = await dispatch(addGradeSujects(subjectGrades)).unwrap();

      toast.success(t("subjects-added") || "Subjects added successfully!", {
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
      console.error("Error adding subjects:", error);

      if (error?.status === 401) {
        Swal.fire({
          title: t("error-add-subject") || "Error adding subjects",
          text:
            t("error-add-subjects-text") ||
            "You don't have permission to add subjects",
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
          ...INITIAL_FORM_STATE_ADD_SUBJECTS,
        }}
        validationSchema={FORM_VALIDATION_SCHEMA_ADD_SUBJECTS}
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
              <HeadingElement mode={themeMode}>
                {t("add-subjects-now") || "Add Subjects"}
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
                          "Choose the grade level for the subjects"}
                      </Typography>

                      {/* Grade Select with Localized Loader */}
                      <Box sx={{ position: "relative" }}>
                        <SelectComponent
                          name="gradesSelect"
                          options={gradesSelect}
                          label={t("select-grade") || "Select Grade"}
                          disabled={loadingGetAllGrades}
                        />

                        {/* Localized Loader for Grades */}
                        {loadingGetAllGrades && (
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
                              borderRadius: 1,
                              zIndex: 10,
                            }}
                          >
                            <Box textAlign="center">
                              <CircularProgress size={24} sx={{ mb: 1 }} />
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "0.75rem" }}
                              >
                                {t("loading-grades") || "Loading Grades..."}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  )}

                  {/* Step 1: Select Subjects (Multi-select) */}
                  {activeStep === 1 && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                        {t("select-subjects-description") ||
                          "Choose multiple subjects for this grade. You can remove selected subjects by clicking the X button on each chip."}
                      </Typography>

                      {/* Subjects Multi-Select with Localized Loader */}
                      <Box sx={{ position: "relative" }}>
                        <MultiSelectComponent
                          name="subjects"
                          options={subjectSelect}
                          label={t("select-subjects") || "Select Subjects"}
                          disabled={isLoadingSubjects}
                        />

                        {/* Localized Loader for Subjects */}
                        {isLoadingSubjects && (
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
                              borderRadius: 1,
                              zIndex: 10,
                            }}
                          >
                            <Box textAlign="center">
                              <CircularProgress size={24} sx={{ mb: 1 }} />
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "0.75rem" }}
                              >
                                {t("loading-subjects") || "Loading Subjects..."}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Grid>
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
                        ? t("adding-subjects") || "Adding subjects..."
                        : t("addSubjects") || "Add Subjects"}
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

export default withGuard(AddGradeSubjects);
