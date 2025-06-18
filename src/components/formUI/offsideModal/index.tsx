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
  FormControlLabel,
  Checkbox,
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
  makeFiveHintsQuestion,
  makeOffsideQuestion,
} from "../../../state/act/actGame";

interface FormValues {
  grade: string;
  chapterMakeQuestion: string;
  information1: string;
  information2: string;
  information3: string;
  information4: string;
  information5: string;
  information6: string;
  summary: string;
  correctAnswers: number[];
}

interface MultiStepOffsideModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM_STATE: FormValues = {
  grade: "",
  chapterMakeQuestion: "",
  information1: "",
  information2: "",
  information3: "",
  information4: "",
  information5: "",
  information6: "",
  correctAnswers: [],
  summary: "",
};

const VALIDATION_SCHEMA = Yup.object({
  grade: Yup.string().required("Grade is required"),
  chapterMakeQuestion: Yup.string().required("Chapter is required"),
  information1: Yup.string().required("Information 1 is required"),
  information2: Yup.string().required("Information 2 is required"),
  information3: Yup.string().required("Information 3 is required"),
  information4: Yup.string().required("Information 4 is required"),
  information5: Yup.string().required("Information 5 is required"),
  information6: Yup.string().required("Information 6 is required"),
  correctAnswers: Yup.array().min(1, "At least one correct answer is required"),
  summary: Yup.string().required("Summary is required"),
});

function MultiStepOffsideModal({ open, onClose }: MultiStepOffsideModalProps) {
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

  const steps = [
    t("offsideCreation.steps.selectGrade") || "Select Grade",
    t("offsideCreation.steps.selectChapter") || "Select Chapter",
    t("offsideCreation.steps.enterInformations") || "Enter Informations",
    t("offsideCreation.steps.selectCorrect") || "Select Correct Answers",
    t("questionCreation.steps.summary"),
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

  useEffect(() => {
    if (open) {
      console.log("Offside modal opened, ready to create question...");
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
      setErrors({
        grade: t("offsideCreation.errors.gradeRequired") || "Grade is required",
      });
      return;
    } else if (activeStep === 0 && values.grade) {
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
        toast.error(
          t("offsideCreation.errors.chapterFetchError") ||
            "Error fetching chapters"
        );
      } finally {
        setIsLoadingChapters(false);
      }
    }

    if (activeStep === 1 && !values.chapterMakeQuestion) {
      setTouched({ chapterMakeQuestion: true });
      setErrors({
        chapterMakeQuestion:
          t("offsideCreation.errors.chapterRequired") || "Chapter is required",
      });
      return;
    }

    if (activeStep === 2) {
      const informations = [
        values.information1,
        values.information2,
        values.information3,
        values.information4,
        values.information5,
        values.information6,
      ];
      const emptyInfo = informations.findIndex((info) => !info.trim());
      if (emptyInfo !== -1) {
        setTouched({ [`information${emptyInfo + 1}`]: true } as any);
        setErrors({
          [`information${emptyInfo + 1}`]: `Information ${
            emptyInfo + 1
          } is required`,
        } as any);
        return;
      }
    }

    if (activeStep === 3 && values.correctAnswers.length === 0) {
      setErrors({
        correctAnswers:
          t("offsideCreation.errors.correctAnswersRequired") ||
          "At least one correct answer is required",
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

  const handleCorrectAnswerChange = (
    index: number,
    checked: boolean,
    setFieldValue: any,
    values: FormValues
  ) => {
    const newCorrectAnswers = checked
      ? [...values.correctAnswers, index + 1]
      : values.correctAnswers.filter((answer) => answer !== index + 1);

    setFieldValue("correctAnswers", newCorrectAnswers.sort());
  };

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      const informations = [
        values.information1,
        values.information2,
        values.information3,
        values.information4,
        values.information5,
        values.information6,
      ];

      const questionData = {
        userId: Uid || "",
        grade: Number.parseInt(values.grade),
        chapter: values.chapterMakeQuestion,
        hints: informations,
        answer: values.correctAnswers.join(""),
        summary: values.summary,
        game: "offside",
      };

      console.log("Submitting offside question data:", questionData);
      console.log("Submitting question data:", questionData);

      // Dispatch the makeFiveHintsQuestion action
      const result = await dispatch(makeFiveHintsQuestion(questionData));

      if (makeFiveHintsQuestion.fulfilled.match(result)) {
        console.log("Question created successfully:", result.payload);

        // Show success toast
        toast.success(t("offsideCreation.toast.success"), {
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
        toast.error(t("offsideCreation.toast.error"), {
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
      toast.error(t("offsideCreation.toast.error"), {
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
                  ? t("offsideCreation.buttons.creating") || "Creating..."
                  : t("loadingChapters") || "Loading chapters..."}
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
            {t("offsideCreation.title") || "Create Offside Question"}
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
              <Box sx={{ minHeight: "300px", mb: 3 }}>
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
                      {t("offsideCreation.descriptions.grade") ||
                        "Select the grade level for this offside question"}
                    </Typography>
                    <SelectComponent
                      name="grade"
                      options={grades}
                      label={t("offsideCreation.labels.grade") || "Grade"}
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
                      {t("offsideCreation.descriptions.chapter") ||
                        "Select the chapter for this offside question"}
                    </Typography>
                    <SelectComponent
                      name="chapterMakeQuestion"
                      options={chapters}
                      label={t("offsideCreation.labels.chapter") || "Chapter"}
                      disabled={isLoadingChapters}
                    />
                  </Box>
                )}
                {/* Step 3: Enter Informations */}
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
                      {t("offsideCreation.descriptions.informations") ||
                        "Enter 6 pieces of information for the offside question"}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <TextFieldWrapper
                          key={num}
                          name={`information${num}`}
                          label={`${
                            t("offsideCreation.labels.information") ||
                            "Information"
                          } ${num} *`}
                          type="text"
                          // multiline
                          // rows={2}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                {/* Step 4: Select Correct Answers */}
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
                      {t("offsideCreation.descriptions.correctAnswers") ||
                        "Select which informations are correct"}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => {
                        const informationValue = values[
                          `information${num}` as keyof FormValues
                        ] as string;
                        return (
                          <Box
                            key={num}
                            sx={{
                              p: 2,
                              border: 1,
                              borderColor: "divider",
                              borderRadius: 1,
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                              Information {num}:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ mb: 2, color: "text.secondary" }}
                            >
                              {informationValue || `Information ${num} content`}
                            </Typography>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.correctAnswers.includes(num)}
                                  onChange={(e) =>
                                    handleCorrectAnswerChange(
                                      num - 1,
                                      e.target.checked,
                                      setFieldValue,
                                      values
                                    )
                                  }
                                  sx={{
                                    color:
                                      mymode === "light"
                                        ? "#c31432"
                                        : "#ff6b9d",
                                    "&.Mui-checked": {
                                      color:
                                        mymode === "light"
                                          ? "#c31432"
                                          : "#ff6b9d",
                                    },
                                  }}
                                />
                              }
                              label={
                                t("offsideCreation.labels.correctAnswer") ||
                                "This information is correct"
                              }
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}{" "}
                {/* step 5: Enter Summary */}
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
                  {t("offsideCreation.buttons.back") || "Back"}
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
                      ? t("offsideCreation.buttons.creating") || "Creating..."
                      : t("offsideCreation.buttons.create") ||
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
                      "&:disabled": {
                        backgroundColor:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.12)"
                            : "rgba(255, 255, 255, 0.12)",
                      },
                    }}
                    disabled={isLoadingChapters}
                  >
                    {t("offsideCreation.buttons.next") || "Next"}
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

export default MultiStepOffsideModal;
