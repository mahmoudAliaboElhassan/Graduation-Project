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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, type FormikTouched, type FormikErrors } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { toast } from "react-toastify";
import TextFieldWrapper from "../textField";
import SelectComponent from "../select";
import UseCategoryEntertainment from "../../../hooks/use-category-entertainment";
import { makeEntertainmentQuestions } from "../../../state/act/actGame";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

// Import your existing components

interface FormValues {
  question: string;
  answer: string;
  section: string;
  hint1: string;
  hint2: string;
  hint3: string;
  hint4: string;
  hint5: string;
  summary: string;
}

interface FiveHintsQuestionModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM_STATE: FormValues = {
  question: "",
  answer: "",
  section: "",
  hint1: "",
  hint2: "",
  hint3: "",
  hint4: "",
  hint5: "",
  summary: "",
};

const VALIDATION_SCHEMA = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  section: Yup.string().required("Section is required"),
  hint1: Yup.string().required("At least one hint is required"),
  summary: Yup.string().required("Summary is required"),
});

// Section options - you can modify these based on your needs

function MultipleStepEntertainment({
  open,
  onClose,
}: FiveHintsQuestionModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categoriesEntertainment } = UseCategoryEntertainment();

  const { mymode } = useAppSelector((state) => state.mode);
  const dispatch = useAppDispatch();

  const steps = [
    t("questionCreation.steps.question") || "Enter Question",
    t("questionCreation.steps.answer") || "Enter Answer",
    t("questionCreation.steps.section") || "Select Section",
    t("questionCreation.steps.enterHints") || "Enter Hints",
    t("questionCreation.steps.summary") || "Enter Summary",
  ];

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

  useEffect(() => {
    if (open) {
      console.log("Five Hints Question Modal opened...");
    }
  }, [open]);

  const handleNext = async (
    values: FormValues,
    setTouched: (
      touched: Partial<FormikTouched<FormValues>>,
      shouldValidate?: boolean
    ) => void,
    setErrors: (errors: Partial<FormikErrors<FormValues>>) => void
  ) => {
    // Validation for each step
    if (activeStep === 0 && !values.question.trim()) {
      setTouched({ question: true });
      setErrors({
        question:
          t("questionCreation.errors.questionRequired") ||
          "Question is required",
      });
      return;
    }

    if (activeStep === 1 && !values.answer.trim()) {
      setTouched({ answer: true });
      setErrors({
        answer:
          t("questionCreation.errors.answerRequired") || "Answer is required",
      });
      return;
    }

    if (activeStep === 2 && !values.section) {
      setTouched({ section: true });
      setErrors({
        section:
          t("questionCreation.errors.sectionRequired") || "Section is required",
      });
      return;
    }

    if (activeStep === 3 && !values.hint1.trim()) {
      setTouched({ hint1: true });
      setErrors({
        hint1:
          t("questionCreation.errors.hintsRequired") ||
          "At least one hint is required",
      });
      return;
    }

    if (activeStep === 4 && !values.summary.trim()) {
      setTouched({ summary: true });
      setErrors({
        summary:
          t("questionCreation.errors.summaryRequired") || "Summary is required",
      });
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      // Prepare hints array, filtering out empty hints
      const hints = [
        values.hint1,
        values.hint2,
        values.hint3,
        values.hint4,
        values.hint5,
      ].filter((hint) => hint.trim() !== "");

      // Prepare data according to your structure
      const questionData = {
        question: values.question,
        answer: values.answer,
        game: "five hints",
        section: Number.parseInt(values.section),
        hints: hints,
        summary: values.summary,
      };

      console.log("Submitting five hints question data:", questionData);

      // Dispatch the makeEducationQuestions action
      const result = await dispatch(makeEntertainmentQuestions(questionData));

      if (makeEntertainmentQuestions.fulfilled.match(result)) {
        console.log("Question created successfully:", result.payload);

        // Show success toast
        toast.success(t("questionCreation.toast.success"), {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form and close modal after a short delay
        setTimeout(() => {
          resetForm();
          setActiveStep(0);
          onClose();
        }, 1000);
      } else {
        console.error("Failed to create question:", result.payload);

        // Show error toast
        toast.error(t("questionCreation.toast.error"), {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error creating question:", error);

      // Show error toast
      toast.error(t("questionCreation.toast.error"), {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          width: { xs: "90%", sm: "500px", md: "600px" },
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflow: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          ...modalStyle,
        }}
      >
        {/* Loading Overlay */}
        {isSubmitting && (
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
                {t("questionCreation.buttons.creating") ||
                  "Creating Question..."}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Header with close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            borderBottom: `1px solid ${
              mymode === "light"
                ? "rgba(195, 20, 50, 0.2)"
                : "rgba(255, 107, 157, 0.2)"
            }`,
            pb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{
              color: mymode === "light" ? "#c31432" : "#ff6b9d",
              textShadow:
                mymode === "light"
                  ? "1px 1px 2px rgba(0,0,0,0.1)"
                  : "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {t("questionCreation.title") || "Create Five Hints Question"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
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
            mb: 4,
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
            "& .MuiStepConnector-line": {
              borderColor:
                mymode === "light"
                  ? "rgba(195, 20, 50, 0.2)"
                  : "rgba(255, 107, 157, 0.2)",
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
          initialValues={INITIAL_FORM_STATE}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setTouched, setErrors }) => (
            <Form>
              <Box sx={{ minHeight: "300px", mb: 3 }}>
                {/* Step 1: Enter Question */}
                {activeStep === 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: mymode === "light" ? "#c31432" : "#ff6b9d",
                        fontWeight: "bold",
                      }}
                    >
                      {steps[0]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {t("questionCreation.descriptions.question") ||
                        "Enter the main question for the five hints game"}
                    </Typography>
                    <TextFieldWrapper
                      name="question"
                      label={
                        t("questionCreation.labels.question") || "Question"
                      }
                    />
                  </Box>
                )}

                {/* Step 2: Enter Answer */}
                {activeStep === 1 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: mymode === "light" ? "#c31432" : "#ff6b9d",
                        fontWeight: "bold",
                      }}
                    >
                      {steps[1]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {t("questionCreation.descriptions.answer") ||
                        "Enter the correct answer to the question"}
                    </Typography>
                    <TextFieldWrapper
                      name="answer"
                      label={t("questionCreation.labels.answer") || "Answer"}
                      type="text"
                    />
                  </Box>
                )}

                {/* Step 3: Select Section */}
                {activeStep === 2 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: mymode === "light" ? "#c31432" : "#ff6b9d",
                        fontWeight: "bold",
                      }}
                    >
                      {steps[2]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {t("questionCreation.descriptions.section") ||
                        "Select the section for this question"}
                    </Typography>
                    <SelectComponent
                      name="section"
                      options={categoriesEntertainment}
                      label={t("questionCreation.labels.section") || "Section"}
                    />
                  </Box>
                )}

                {/* Step 4: Enter Hints */}
                {activeStep === 3 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: mymode === "light" ? "#c31432" : "#ff6b9d",
                        fontWeight: "bold",
                      }}
                    >
                      {steps[3]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {t("questionCreation.descriptions.hints") ||
                        "Enter up to 5 hints to help players guess the answer"}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <TextFieldWrapper
                          key={num}
                          name={`hint${num}`}
                          label={`${
                            t("questionCreation.labels.hint") || "Hint"
                          } ${num}${num === 1 ? " *" : ""}`}
                          type="text"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Step 5: Enter Summary */}
                {activeStep === 4 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: mymode === "light" ? "#c31432" : "#ff6b9d",
                        fontWeight: "bold",
                      }}
                    >
                      {steps[4]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {t("questionCreation.descriptions.summary") ||
                        "Enter a summary or additional information about the answer"}
                    </Typography>
                    <TextFieldWrapper
                      name="summary"
                      label={t("questionCreation.labels.summary") || "Summary"}
                      type="text"
                    />
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
                  {t("questionCreation.buttons.back") || "Back"}
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth={isMobile}
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("questionCreation.buttons.creating") || "Creating..."
                      : t("questionCreation.buttons.create") ||
                        "Create Question"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleNext(values, setTouched, setErrors)}
                    fullWidth={isMobile}
                    sx={{
                      order: isMobile ? 1 : 2,
                      backgroundColor:
                        mymode === "light" ? "#c31432" : "#ff6b9d",
                      "&:hover": {
                        backgroundColor:
                          mymode === "light" ? "#a01729" : "#ff4081",
                      },
                    }}
                  >
                    {t("questionCreation.buttons.next") || "Next"}
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
}

export default MultipleStepEntertainment;
