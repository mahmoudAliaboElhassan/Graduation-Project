"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  CircularProgress,
  Alert,
  Backdrop,
} from "@mui/material";
import { Formik, Form, type FormikTouched, type FormikErrors } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

import UseInitialValues from "../../../hooks/use-initial-values";
import UseFormValidation from "../../../hooks/use-form-validation";
import SelectComponent from "../../../components/formUI/select";
import ButtonWrapper from "../../../components/formUI/submit";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getSubjects, getChapters } from "../../../state/slices/auth";
import UseDirection from "../../../hooks/use-direction";
import withGuard from "../../../utils/withGuard";

interface FormValues {
  subjectQetQuestions: string;
  chapter: string;
}

const MultiStepModal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);
  const [stepErrors, setStepErrors] = useState<{ [key: number]: string }>({});

  const { INITIAL_FORM_STATE_GET_QUESTIONS } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_GET_QUESTIONS } = UseFormValidation();
  const { t } = useTranslation();
  const { direction } = UseDirection();
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Redux state and dispatch
  const { grade, subjects, chapters } = useAppSelector((state) => state.auth);
  const { mymode } = useAppSelector((state) => state.mode);
  const dispatch = useAppDispatch();

  // Steps for the stepper
  const steps = [t("select-subject"), t("select-chapter")];

  // Theme-based styling
  const modalStyle = {
    backgroundColor:
      mymode === "light"
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(26, 26, 46, 0.95)",
    backdropFilter: "blur(20px)",
    border:
      mymode === "light"
        ? "1px solid rgba(195, 20, 50, 0.2)"
        : "1px solid rgba(255, 107, 157, 0.3)",
    boxShadow:
      mymode === "light"
        ? "0 8px 32px rgba(195, 20, 50, 0.2)"
        : "0 8px 32px rgba(26, 26, 46, 0.4)",
  };

  // Fetch subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      if (grade && !subjects?.length) {
        setIsLoadingSubjects(true);
        try {
          await dispatch(getSubjects({ grade: +grade })).unwrap();
        } catch (error) {
          console.error("Error fetching subjects:", error);
          setStepErrors({ 0: t("error-fetching-subjects") });
        } finally {
          setIsLoadingSubjects(false);
        }
      }
    };
    fetchSubjects();
  }, [dispatch, grade, subjects?.length, t]);

  // Handle closing the modal
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  // Handle next step in the form
  const handleNext = async (
    values: FormValues,
    setTouched: (
      touched: Partial<FormikTouched<FormValues>>,
      shouldValidate?: boolean
    ) => void,
    setErrors: (errors: Partial<FormikErrors<FormValues>>) => void
  ) => {
    console.log("values", values);

    // Clear previous step errors
    setStepErrors({});

    if (activeStep === 0 && !values.subjectQetQuestions) {
      setTouched({ subjectQetQuestions: true });
      setErrors({ subjectQetQuestions: t("subject-required") });
      setStepErrors({ 0: t("subject-required") });
      return;
    } else if (activeStep === 0 && values.subjectQetQuestions) {
      setIsLoadingChapters(true);
      try {
        await dispatch(
          getChapters({
            grade: grade ? +grade : 1,
            subject: values.subjectQetQuestions,
          })
        ).unwrap();
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setStepErrors({ 0: t("error-fetching-chapters") });
        setIsLoadingChapters(false);
        return;
      } finally {
        setIsLoadingChapters(false);
      }
    }

    if (activeStep === 1 && !values.chapter) {
      setTouched({ chapter: true });
      setErrors({ chapter: t("chapter-required") });
      setStepErrors({ 1: t("chapter-required") });
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle going back a step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setStepErrors({});
  };

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    console.log("Final values", values);
    localStorage.setItem("subject", values.subjectQetQuestions);
    localStorage.setItem("chapter", values.chapter);

    params.gameType === "five-hints"
      ? navigate("play-five-hints")
      : navigate("play-offside");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Modal
        open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor:
              mymode === "light"
                ? "rgba(195, 20, 50, 0.1)"
                : "rgba(26, 26, 46, 0.3)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "450px", md: "500px" },
            maxWidth: "95vw",
            maxHeight: "90vh",
            overflow: "auto",
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            direction: direction.direction,
            ...modalStyle,
          }}
        >
          {/* Header with close button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              borderBottom: `1px solid ${
                mymode === "light"
                  ? "rgba(195, 20, 50, 0.2)"
                  : "rgba(255, 107, 157, 0.2)"
              }`,
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: mymode === "light" ? "#c31432" : "#ff6b9d",
                fontWeight: "bold",
              }}
            >
              {t("get-question-heading")}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: mymode === "light" ? "#c31432" : "#ff6b9d",
                "&:hover": {
                  backgroundColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.1)"
                      : "rgba(255, 107, 157, 0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 3,
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                color:
                  mymode === "light"
                    ? "rgba(0, 0, 0, 0.7)"
                    : "rgba(255, 255, 255, 0.7)",
                "&.Mui-active": {
                  color: mymode === "light" ? "#c31432" : "#ff6b9d",
                  fontWeight: "bold",
                },
                "&.Mui-completed": {
                  color: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
              },
              "& .MuiStepIcon-root": {
                color:
                  mymode === "light"
                    ? "rgba(195, 20, 50, 0.3)"
                    : "rgba(255, 107, 157, 0.3)",
                "&.Mui-active": {
                  color: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
                "&.Mui-completed": {
                  color: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel error={!!stepErrors[index]}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Error Alert */}
          {stepErrors[activeStep] && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                backgroundColor:
                  mymode === "light"
                    ? "rgba(211, 47, 47, 0.1)"
                    : "rgba(183, 28, 28, 0.2)",
                color: mymode === "light" ? "#d32f2f" : "#ff6b6b",
                border: `1px solid ${
                  mymode === "light" ? "#d32f2f" : "#ff6b6b"
                }`,
              }}
            >
              {stepErrors[activeStep]}
            </Alert>
          )}

          {/* Loading Overlay */}
          {(isLoadingSubjects || isLoadingChapters) && (
            <Box
              sx={{
                position: "absolute",
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
                zIndex: 1000,
                borderRadius: 2,
              }}
            >
              <Box textAlign="center">
                <CircularProgress
                  size={40}
                  sx={{
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                  }}
                >
                  {isLoadingSubjects
                    ? t("loading-subjects")
                    : t("loadingChapters")}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Form */}
          <Formik
            initialValues={INITIAL_FORM_STATE_GET_QUESTIONS}
            validationSchema={FORM_VALIDATION_SCHEMA_GET_QUESTIONS}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setTouched, setErrors }) => (
              <Form>
                <Box sx={{ minHeight: "200px", mb: 3 }}>
                  {activeStep === 0 && (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color:
                            mymode === "light"
                              ? "rgba(0, 0, 0, 0.6)"
                              : "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {t("select-subject-description")}
                      </Typography>
                      <SelectComponent
                        name="subjectQetQuestions"
                        options={subjects as any}
                        label={t("select-subject")}
                        disabled={isLoadingSubjects}
                      />
                      {isLoadingSubjects && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <CircularProgress
                            size={16}
                            sx={{
                              mr: 1,
                              color: mymode === "light" ? "#c31432" : "#ff6b9d",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color:
                                mymode === "light"
                                  ? "rgba(0, 0, 0, 0.6)"
                                  : "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            {t("loading-subjects")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}

                  {activeStep === 1 && (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color:
                            mymode === "light"
                              ? "rgba(0, 0, 0, 0.6)"
                              : "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {t("select-chapter-description")}
                      </Typography>
                      <SelectComponent
                        name="chapter"
                        options={chapters || []}
                        label={t("select-chapter")}
                        disabled={isLoadingChapters || !chapters?.length}
                      />
                      {isLoadingChapters && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <CircularProgress
                            size={16}
                            sx={{
                              mr: 1,
                              color: mymode === "light" ? "#c31432" : "#ff6b9d",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color:
                                mymode === "light"
                                  ? "rgba(0, 0, 0, 0.6)"
                                  : "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            {t("loadingChapters")}
                          </Typography>
                        </Box>
                      )}
                      {(!chapters || chapters.length === 0) &&
                        !isLoadingChapters && (
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 1,
                              display: "block",
                              color:
                                mymode === "light"
                                  ? "rgba(0, 0, 0, 0.6)"
                                  : "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            {t("no-chapters-available")}
                          </Typography>
                        )}
                    </Box>
                  )}
                </Box>

                {/* Navigation buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 2 : 0,
                    pt: 2,
                    borderTop: `1px solid ${
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.2)"
                        : "rgba(255, 107, 157, 0.2)"
                    }`,
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    fullWidth={isMobile}
                    sx={{
                      order: isMobile ? 2 : 1,
                      borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                      color: mymode === "light" ? "#c31432" : "#ff6b9d",
                      "&:hover": {
                        borderColor: mymode === "light" ? "#a01729" : "#ff4081",
                        backgroundColor:
                          mymode === "light"
                            ? "rgba(195, 20, 50, 0.1)"
                            : "rgba(255, 107, 157, 0.1)",
                      },
                      "&:disabled": {
                        borderColor:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.12)"
                            : "rgba(255, 255, 255, 0.12)",
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.26)"
                            : "rgba(255, 255, 255, 0.26)",
                      },
                    }}
                  >
                    {t("back")}
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <ButtonWrapper
                      fullWidth={isMobile}
                      disabled={!values.chapter || isLoadingChapters}
                      sx={{
                        order: isMobile ? 1 : 2,
                        backgroundColor:
                          mymode === "light" ? "#c31432" : "#ff6b9d",
                        "&:hover": {
                          backgroundColor:
                            mymode === "light" ? "#a01729" : "#ff4081",
                        },
                        "&:disabled": {
                          backgroundColor:
                            mymode === "light"
                              ? "rgba(0, 0, 0, 0.12)"
                              : "rgba(255, 255, 255, 0.12)",
                        },
                      }}
                    >
                      {t("get-questions")}
                    </ButtonWrapper>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleNext(values, setTouched, setErrors)}
                      fullWidth={isMobile}
                      disabled={
                        (activeStep === 0 &&
                          (!values.subjectQetQuestions ||
                            isLoadingSubjects ||
                            isLoadingChapters)) ||
                        (activeStep === 1 && !values.chapter)
                      }
                      sx={{
                        order: isMobile ? 1 : 2,
                        backgroundColor:
                          mymode === "light" ? "#c31432" : "#ff6b9d",
                        "&:hover": {
                          backgroundColor:
                            mymode === "light" ? "#a01729" : "#ff4081",
                        },
                        "&:disabled": {
                          backgroundColor:
                            mymode === "light"
                              ? "rgba(0, 0, 0, 0.12)"
                              : "rgba(255, 255, 255, 0.12)",
                        },
                      }}
                    >
                      {isLoadingChapters && activeStep === 0 ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CircularProgress
                            size={16}
                            sx={{ mr: 1, color: "white" }}
                          />
                          {t("loading")}
                        </Box>
                      ) : (
                        t("next")
                      )}
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Modal>
    </div>
  );
};

export default withGuard(MultiStepModal);
