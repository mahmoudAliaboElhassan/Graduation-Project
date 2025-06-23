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
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik, Form, type FormikTouched, type FormikErrors } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Import your existing components and hooks
import SelectComponent from "../../formUI/select";
import TextFieldWrapper from "../../formUI/textField";
import UseGrades from "../../../hooks/use-grades";
import { getChapters } from "../../../state/act/actAuth";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  makeEducationDifficulty,
  makeEducationQuestions,
} from "../../../state/act/actGame";

interface Question {
  question: string;
  answer: string;
  summary: string;
  difficultyLevel: number;
}

interface FormValues {
  grade: string;
  chapterMakeQuestion: string;
  questions: Question[];
}

interface MultipleStepDifficultyMoadalProps {
  open: boolean;
  onClose: () => void;
}

// Static 6 questions initial state
const INITIAL_FORM_STATE: FormValues = {
  grade: "",
  chapterMakeQuestion: "",
  questions: Array(6)
    .fill({
      question: "",
      answer: "",
      summary: "",
      difficultyLevel: 0,
    })
    .map(() => ({
      question: "",
      answer: "",
      summary: "",
      difficultyLevel: 0,
    })),
};

const VALIDATION_SCHEMA = Yup.object({
  grade: Yup.string().required("Grade is required"),
  chapterMakeQuestion: Yup.string().required("Chapter is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        answer: Yup.string().required("Answer is required"),
        summary: Yup.string().required("Summary is required"),
        difficultyLevel: Yup.number()
          .min(0)
          .max(4)
          .required("Difficulty level is required"),
      })
    )
    .length(6, "Exactly 6 questions are required"),
});

function MultipleStepDifficultyMoadal({
  open,
  onClose,
}: MultipleStepDifficultyMoadalProps) {
  const { t } = useTranslation("translation");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);

  // Redux state and dispatch
  const { chapters, subjectTeaching, Uid } = useAppSelector(
    (state) => state.auth
  );
  const { mymode } = useAppSelector((state) => state.mode);
  const { grades } = UseGrades();
  const dispatch = useAppDispatch();

  // Updated steps - now only 3 steps
  const steps = [
    t("questionCreation.steps.selectGrade"),
    t("questionCreation.steps.selectChapter"),
    t("questionCreation.steps.enterQuestions"),
  ];

  const difficultyLevels = [
    { value: 0, label: t("difficulty.levels.veryEasy") },
    { value: 1, label: t("difficulty.levels.easy") },
    { value: 2, label: t("difficulty.levels.medium") },
    { value: 3, label: t("difficulty.levels.hard") },
    { value: 4, label: t("difficulty.levels.veryHard") },
  ];

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

  // Fetch chapters when component loads or grade changes
  useEffect(() => {
    if (open) {
      console.log("Modal opened, ready to create questions...");
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
      setIsLoadingChapters(true);
      try {
        await dispatch(
          getChapters({
            grade: +values.grade,
            subject: subjectTeaching || "Arabic",
          })
        ).unwrap();
      } catch (error) {
        console.error("Error fetching chapters:", error);
        toast.error(t("questionCreation.errors.chapterFetchError"));
      } finally {
        setIsLoadingChapters(false);
      }
    }

    if (activeStep === 1 && !values.chapterMakeQuestion) {
      setTouched({ chapterMakeQuestion: true });
      setErrors({
        chapterMakeQuestion: t("questionCreation.errors.chapterRequired"),
      });
      return;
    }

    if (activeStep === 2) {
      // Validate all 6 questions on the last step
      const hasEmptyQuestions = values.questions.some(
        (q) => !q.question.trim() || !q.answer.trim() || !q.summary.trim()
      );
      if (hasEmptyQuestions) {
        toast.error("Please fill in all fields for all 6 questions");
        return;
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    console.log("Form submitted with values:", values);

    setIsSubmitting(true);
    try {
      // Log the exact structure being submitted
      console.log("Questions array:", values.questions);

      // Prepare data for submission
      const questionData = {
        grade: Number.parseInt(values.grade),
        userId: Uid || "",
        chapter: values.chapterMakeQuestion,
        questions: values.questions,
        game: "DifficultyLevel",
      };
      const result = await dispatch(makeEducationDifficulty(questionData));

      if (makeEducationDifficulty.fulfilled.match(result)) {
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
          width: { xs: "90%", sm: "600px", md: "800px" },
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflow: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          ...modalStyle,
        }}
      >
        {/* Loading Overlay */}
        {(isLoadingChapters || isSubmitting) && (
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
                {isSubmitting
                  ? t("questionCreation.buttons.creating")
                  : t("loadingChapters")}
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
            {t("questionCreation.title")}
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
          {({ values, setTouched, setErrors, setFieldValue }) => (
            <Form>
              <Box sx={{ minHeight: "400px", mb: 3 }}>
                {/* Step 1: Select Grade */}
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
                      {t("questionCreation.descriptions.chapter")}
                    </Typography>
                    <SelectComponent
                      name="chapterMakeQuestion"
                      options={chapters}
                      label={t("questionCreation.labels.chapter")}
                      disabled={isLoadingChapters}
                    />
                  </Box>
                )}

                {/* Step 3: Enter 6 Static Questions */}
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
                      {t("questionCreation.descriptions.questions")}
                    </Typography>

                    <Box>
                      {values.questions.map((question, index) => (
                        <Paper
                          key={index}
                          elevation={2}
                          sx={{
                            p: 3,
                            mb: 3,
                            backgroundColor:
                              mymode === "light"
                                ? "rgba(255, 255, 255, 0.8)"
                                : "rgba(26, 26, 46, 0.8)",
                            border: `1px solid ${
                              mymode === "light"
                                ? "rgba(195, 20, 50, 0.1)"
                                : "rgba(255, 107, 157, 0.1)"
                            }`,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: mymode === "light" ? "#c31432" : "#ff6b9d",
                              fontWeight: "bold",
                              mb: 2,
                            }}
                          >
                            Question {index + 1} of 6
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                            }}
                          >
                            <TextFieldWrapper
                              name={`questions.${index}.question`}
                              label="Question"
                            />
                            <TextFieldWrapper
                              name={`questions.${index}.answer`}
                              label="Answer"
                              type="text"
                            />
                            <TextFieldWrapper
                              name={`questions.${index}.summary`}
                              label="Summary"
                              type="text"
                            />
                            <TextField
                              select
                              name={`questions.${index}.difficultyLevel`}
                              label="Difficulty Level"
                              value={question.difficultyLevel}
                              onChange={(e) =>
                                setFieldValue(
                                  `questions.${index}.difficultyLevel`,
                                  parseInt(e.target.value)
                                )
                              }
                              fullWidth
                              variant="outlined"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor:
                                      mymode === "light"
                                        ? "rgba(195, 20, 50, 0.3)"
                                        : "rgba(255, 107, 157, 0.3)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor:
                                      mymode === "light"
                                        ? "#c31432"
                                        : "#ff6b9d",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor:
                                      mymode === "light"
                                        ? "#c31432"
                                        : "#ff6b9d",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color:
                                    mymode === "light"
                                      ? "rgba(0, 0, 0, 0.6)"
                                      : "rgba(255, 255, 255, 0.6)",
                                  "&.Mui-focused": {
                                    color:
                                      mymode === "light"
                                        ? "#c31432"
                                        : "#ff6b9d",
                                  },
                                },
                              }}
                            >
                              {difficultyLevels.map((level) => (
                                <MenuItem key={level.value} value={level.value}>
                                  {level.value} - {level.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
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
                  {t("questionCreation.buttons.back")}
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
                      ? t("questionCreation.buttons.creating")
                      : t("questionCreation.buttons.create")}
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
                      "&:disabled": {
                        backgroundColor:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.12)"
                            : "rgba(255, 255, 255, 0.12)",
                      },
                    }}
                    disabled={isLoadingChapters}
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

export default MultipleStepDifficultyMoadal;
