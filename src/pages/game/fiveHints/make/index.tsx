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
} from "@mui/material";
import { Formik, Form, type FormikTouched, type FormikErrors } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Import your existing components and hooks
import SelectComponent from "../../../../components/formUI/select";
import TextFieldWrapper from "../../../../components/formUI/textField";
import UseGrades from "../../../../hooks/use-grades";
import { getChapters } from "../../../../state/act/actAuth";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { makeFiveHintsQuestion } from "../../../../state/act/actGame";

interface FormValues {
  grade: string;
  chapterMakeQuestion: string;
  hint1: string;
  hint2: string;
  hint3: string;
  hint4: string;
  hint5: string;
  correctAnswer: string;
  summary: string;
}

interface MultiStepQuestionModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM_STATE: FormValues = {
  grade: "",
  chapterMakeQuestion: "",
  hint1: "",
  hint2: "",
  hint3: "",
  hint4: "",
  hint5: "",
  correctAnswer: "",
  summary: "",
};

const VALIDATION_SCHEMA = Yup.object({
  grade: Yup.string().required("Grade is required"),
  chapterMakeQuestion: Yup.string().required("Chapter is required"),
  hint1: Yup.string().required("At least one hint is required"),
  correctAnswer: Yup.string().required("Correct answer is required"),
  summary: Yup.string().required("Summary is required"),
});

function MultiStepQuestionModal({
  open,
  onClose,
}: MultiStepQuestionModalProps) {
  const { t } = useTranslation("translation");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redux state and dispatch
  const { chapters, subjectTeaching, Uid } = useAppSelector(
    (state) => state.auth
  );
  const { grades } = UseGrades();
  const dispatch = useAppDispatch();

  // Updated steps with summary text instead of attachment
  const steps = [
    t("questionCreation.steps.selectGrade"),
    t("questionCreation.steps.selectChapter"),
    t("questionCreation.steps.enterHints"),
    t("questionCreation.steps.correctAnswer"),
    t("questionCreation.steps.summary"),
  ];

  // Fetch chapters when component loads or grade changes
  useEffect(() => {
    if (open) {
      console.log("Modal opened, ready to create question...");
    }
  }, [open]);

  const handleNext = (
    values: FormValues,
    setTouched: (
      touched: Partial<FormikTouched<FormValues>>,
      shouldValidate?: boolean
    ) => void,
    setErrors: (errors: Partial<FormikErrors<FormValues>>) => void
  ) => {
    // Validation for each step
    if (activeStep === 0 && !values.grade) {
      setTouched({ grade: true });
      setErrors({ grade: t("questionCreation.errors.gradeRequired") });
      return;
    } else if (activeStep === 0 && values.grade) {
      // Dispatch getChapters with grade and subject from Redux
      console.log(
        "Dispatching getChapters for grade:",
        values.grade,
        "and subject:",
        subjectTeaching
      );
      dispatch(
        getChapters({
          grade: +values.grade,
          subject: subjectTeaching || "Arabic",
        })
      );
    }

    if (activeStep === 1 && !values.chapterMakeQuestion) {
      setTouched({ chapterMakeQuestion: true });
      setErrors({
        chapterMakeQuestion: t("questionCreation.errors.chapterRequired"),
      });
      return;
    }

    if (activeStep === 2 && !values.hint1.trim()) {
      setTouched({ hint1: true });
      setErrors({ hint1: t("questionCreation.errors.hintsRequired") });
      return;
    }

    if (activeStep === 3 && !values.correctAnswer.trim()) {
      setTouched({ correctAnswer: true });
      setErrors({
        correctAnswer: t("questionCreation.errors.correctAnswerRequired"),
      });
      return;
    }

    if (activeStep === 4 && !values.summary.trim()) {
      setTouched({ summary: true });
      setErrors({
        summary: t("questionCreation.errors.summaryRequired"),
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

      // Prepare data according to UserDataHintGameMakeQuestion interface
      const questionData = {
        grade: Number.parseInt(values.grade),
        userId: Uid || "", // Get userId from Redux state
        chapter: values.chapterMakeQuestion,
        answer: values.correctAnswer,
        summary: values.summary, // Now using text summary instead of file
        hints: hints,
      };

      console.log("Submitting question data:", questionData);

      // Dispatch the makeFiveHintsQuestion action
      const result = await dispatch(
        makeFiveHintsQuestion({
          userId: Uid || "",
          grade: +values.grade,
          chapter: values.chapterMakeQuestion,
          hints,
          answer: values.correctAnswer,
          summary: values.summary,

          // userId: "0bc1a462-2dc1-4d18-8310-5f828171367f",
          // grade: 1,
          // chapter: "أسرة سعيدة",
          // hints: ["hint1", "hint2", "hint3", "hint4", "hint5"],
          // answer: "Ans",
          // summary: "summ",
        })
      );

      if (makeFiveHintsQuestion.fulfilled.match(result)) {
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
    <Modal open={open} onClose={onClose}>
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
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
        }}
      >
        {/* Header with close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold">
            {t("questionCreation.title")}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "grey.500" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel={!isMobile}
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{
            mb: 4,
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
          initialValues={INITIAL_FORM_STATE}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setTouched, setErrors, setFieldValue }) => (
            <Form>
              <Box sx={{ minHeight: "300px", mb: 3 }}>
                {/* Step 1: Select Grade */}
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {steps[0]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {t("questionCreation.descriptions.grade")}
                    </Typography>
                    <SelectComponent
                      name="grade"
                      options={grades}
                      label={t("questionCreation.labels.grade")}
                    />
                  </Box>
                )}

                {/* Step 2: Select Chapter */}
                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {steps[1]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {t("questionCreation.descriptions.chapter")}
                    </Typography>
                    <SelectComponent
                      name="chapterMakeQuestion"
                      options={chapters}
                      label={t("questionCreation.labels.chapter")}
                    />
                  </Box>
                )}

                {/* Step 3: Enter Hints */}
                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {steps[2]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {t("questionCreation.descriptions.hints")}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <TextFieldWrapper
                          key={num}
                          name={`hint${num}`}
                          label={`${t("questionCreation.labels.hint")} ${num}${
                            num === 1 ? " *" : ""
                          }`}
                          type="text"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Step 4: Correct Answer */}
                {activeStep === 3 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {steps[3]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {t("questionCreation.descriptions.correctAnswer")}
                    </Typography>
                    <TextFieldWrapper
                      name="correctAnswer"
                      label={t("questionCreation.labels.correctAnswer")}
                      type="text"
                    />
                  </Box>
                )}

                {/* Step 5: Summary Text */}
                {activeStep === 4 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {steps[4]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {t("questionCreation.descriptions.summary")}
                    </Typography>
                    <TextFieldWrapper
                      name="summary"
                      label={t("questionCreation.labels.summary")}
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
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  fullWidth={isMobile}
                  sx={{ order: isMobile ? 2 : 1 }}
                >
                  {t("questionCreation.buttons.back")}
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth={isMobile}
                    sx={{ order: isMobile ? 1 : 2 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("questionCreation.buttons.creating")
                      : t("questionCreation.buttons.create")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleNext(values, setTouched, setErrors)}
                    fullWidth={isMobile}
                    sx={{ order: isMobile ? 1 : 2 }}
                  >
                    {t("questionCreation.buttons.next")}
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

export default function MakeHintsQuestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation("translation");

  return (
    <Box
      sx={{
        py: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t("questionCreation.pageTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          {t("questionCreation.pageDescription")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          {t("questionCreation.buttons.openModal")}
        </Button>
      </Box>

      <MultiStepQuestionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
