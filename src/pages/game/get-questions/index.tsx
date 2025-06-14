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

interface FormValues {
  subjectQetQuestions: string;
  chapter: string;
}

const MultiStepModal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { INITIAL_FORM_STATE_GET_QUESTIONS } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_GET_QUESTIONS } = UseFormValidation();
  const { t } = useTranslation();
  const { direction } = UseDirection();
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Redux state and dispatch
  const { grade, subjects, chapters } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Steps for the stepper
  const steps = [t("select-subject"), t("select-chapter")];

  // Fetch subjects when component mounts
  useEffect(() => {
    dispatch(getSubjects({ grade: grade ? +grade : 1 }));
  }, [dispatch, grade]);

  // Handle closing the modal
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  // Handle next step in the form
  const handleNext = (
    values: FormValues,
    setTouched: (
      touched: Partial<FormikTouched<FormValues>>,
      shouldValidate?: boolean
    ) => void,
    setErrors: (errors: Partial<FormikErrors<FormValues>>) => void
  ) => {
    console.log("values", values);
    if (activeStep === 0 && !values.subjectQetQuestions) {
      setTouched({ subjectQetQuestions: true });
      setErrors({ subjectQetQuestions: t("subject-required") });
      return;
    } else if (activeStep === 0 && values.subjectQetQuestions) {
      dispatch(
        getChapters({
          grade: grade ? +grade : 1,
          subject: values.subjectQetQuestions,
        })
      );
    }

    if (activeStep === 1 && !values.chapter) {
      setTouched({ chapter: true });
      setErrors({ chapter: t("chapter-required") });
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle going back a step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
      <Modal open={true} onClose={handleClose}>
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
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            direction: direction.direction,
          }}
        >
          {/* Header with close button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              {t("get-question-heading")}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
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
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Form */}
          <Formik
            initialValues={INITIAL_FORM_STATE_GET_QUESTIONS}
            validationSchema={FORM_VALIDATION_SCHEMA_GET_QUESTIONS}
            onSubmit={handleSubmit}
          >
            {({ values, setTouched, setErrors }) => (
              <Form>
                {activeStep === 0 && (
                  <Box mt={2}>
                    <SelectComponent
                      name="subjectQetQuestions"
                      options={subjects as any}
                      label={t("select-subject")}
                    />
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box mt={2}>
                    <SelectComponent
                      name="chapter"
                      options={chapters || []}
                      label={t("select-chapter")}
                    />
                  </Box>
                )}

                {/* Navigation buttons */}
                <Box
                  mt={3}
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={isMobile ? "column" : "row"}
                  gap={isMobile ? 2 : 0}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    fullWidth={isMobile}
                    sx={{ order: isMobile ? 2 : 1 }}
                  >
                    {t("back")}
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <ButtonWrapper
                      fullWidth={isMobile}
                      // sx={{ order: isMobile ? 1 : 2 }}
                    >
                      {t("get-questions")}
                    </ButtonWrapper>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleNext(values, setTouched, setErrors)}
                      fullWidth={isMobile}
                      // sx={{ order: isMobile ? 1 : 2 }}
                    >
                      {t("next")}
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

export default MultiStepModal;
