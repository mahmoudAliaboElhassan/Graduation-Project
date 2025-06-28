import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  Backdrop,
  LinearProgress,
  Chip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Import your existing components and hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getEducationDifficulty,
  getEntertainmentDifficulty,
  answerDifficulty, // Assume this action exists
} from "../../../state/act/actGame";
import { clearDifficultyData } from "../../../state/slices/game";
import { addPoints } from "../../../state/act/actAuth";
import Swal from "sweetalert2";

// Types
interface DifficultyQuestion {
  question: string;
  correctAnswer: string;
  score: number;
}

interface FormValues {
  [key: string]: string; // Dynamic form fields for each question
}

interface AnswerSubmission {
  answer: string;
  correctanswer: string;
  question: string;
}

interface DifficultyProps {
  // Add any props if needed
}

const Difficulty: React.FC<DifficultyProps> = () => {
  const { t } = useTranslation("translation");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Router and Redux
  const { categoryGame } = useParams<{ categoryGame: string }>();
  const dispatch = useAppDispatch();
  const { grade } = useAppSelector((state) => state.auth);
  const { difficultyData, loadingGetQuestions } = useAppSelector(
    (state) => state.game
  );

  const { mymode } = useAppSelector((state) => state.mode);

  // Local state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number>(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isGettingNewQuestions, setIsGettingNewQuestions] = useState(false);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [scoreResults, setScoreResults] = useState<{
    answers: boolean[];
    totalScore: number;
    maxScore: number;
  } | null>(null);

  // Fetch difficulty data
  const fetchQuestions = async () => {
    try {
      if (categoryGame === "education") {
        await dispatch(
          getEducationDifficulty({
            grade,
            subject: localStorage.getItem("subject") || "",
            chapter: localStorage.getItem("chapter") || "",
            userID: localStorage.getItem("id") || "",
          })
        ).unwrap();
      } else {
        await dispatch(
          getEntertainmentDifficulty({
            entertainmentSection:
              Number(localStorage.getItem("entertainmentGameId")) || 0,
          })
        ).unwrap();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [dispatch, categoryGame, grade]);

  useEffect(() => {
    return () => {
      dispatch(clearDifficultyData());
    };
  }, [dispatch]);

  // Create validation schema based on difficulty data
  const validationSchema = React.useMemo(() => {
    if (!difficultyData || difficultyData.length === 0) {
      return Yup.object({});
    }

    const schema: { [key: string]: any } = {};
    difficultyData.forEach((_, index) => {
      schema[`question_${index}`] = Yup.string().required(
        t("difficulty.validation.answerRequired", { number: index + 1 })
      );
    });

    return Yup.object(schema);
  }, [difficultyData, t]);

  // Create initial values based on difficulty data
  const initialValues = React.useMemo(() => {
    if (!difficultyData || difficultyData.length === 0) {
      return {};
    }

    const values: FormValues = {};
    difficultyData.forEach((_, index) => {
      values[`question_${index}`] = "";
    });

    return values;
  }, [difficultyData]);

  // Handle form submission
  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    if (!difficultyData) return;

    setIsSubmitting(true);

    try {
      // Transform form values to required format
      const answersArray: AnswerSubmission[] = difficultyData.map(
        (question, index) => ({
          answer: values[`question_${index}`] || "",
          correctanswer: question.correctAnswer,
          question: question.question,
        })
      );

      console.log("Submitting answers:", answersArray);

      // Dispatch submit action (replace with your actual action)
      const result = await dispatch(answerDifficulty(answersArray));

      // Handle success
      if (answerDifficulty.fulfilled.match(result)) {
        // Assuming the result contains an array of booleans
        const answerResults: boolean[] = result.payload; // This should be the array of booleans
        // Calculate score
        const totalScore = answerResults.reduce((score, isCorrect, index) => {
          return score + (isCorrect ? difficultyData[index].score : 0);
        }, 0);

        const maxScore = difficultyData.reduce(
          (total, q) => total + q.score,
          0
        );

        // Set score results and show dialog
        setScoreResults({
          answers: answerResults,
          totalScore,
          maxScore,
        });
        setShowScoreDialog(true);

        // Check categoryGame and handle points accordingly
        if (categoryGame === "education") {
          // For education category, add points to user account
          dispatch(addPoints({ points: totalScore }))
            .unwrap()
            .then((result) => {
              toast.success(
                t(
                  "points-added-success",
                  "{{points}} points added successfully! Total: {{totalPoints}}",
                  {
                    points: totalScore,
                    totalPoints: result.totalpoints,
                  }
                )
              );
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: t("error", "Error"),
                text: t(
                  "failed-to-add-points",
                  "Failed to add points. Please try again."
                ),
              });
            });
        } else {
          // For entertainment category, only show toast
          toast.success(
            t(
              "points-added-success-entertainment",
              "you got {{points}} points",
              {
                points: totalScore,
              }
            )
          );
        }

        // Reset form after success
        setTimeout(() => {
          resetForm();
          setCompletedQuestions(0);
        }, 1000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error(t("difficulty.toast.error"), {
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

  // Handle getting new questions
  const handleGetNewQuestions = async () => {
    setIsGettingNewQuestions(true);
    try {
      // Clear old data first
      dispatch(clearDifficultyData());

      // Fetch new questions
      await fetchQuestions();

      // Reset all states
      setHasSubmitted(false);
      setCompletedQuestions(0);
      setScoreResults(null);
      setShowScoreDialog(false);

      toast.success(t("difficulty.toast.newQuestions"), {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error getting new questions:", error);
      toast.error(
        t("difficulty.toast.errorNewQuestions", "Failed to get new questions"),
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } finally {
      setIsGettingNewQuestions(false);
    }
  };

  // Track completed questions
  const handleFieldChange = (
    values: FormValues,
    setFieldValue: (field: string, value: any) => void,
    fieldName: string,
    value: string
  ) => {
    setFieldValue(fieldName, value);

    // Count completed questions
    const updatedValues = { ...values, [fieldName]: value };
    const completed = Object.values(updatedValues).filter(
      (val) => val.trim() !== ""
    ).length;
    setCompletedQuestions(completed);
  };

  // Close score dialog - FIXED VERSION
  const handleCloseScoreDialog = () => {
    setShowScoreDialog(false);
    // Set hasSubmitted to true so the "Get New Questions" button appears
    setHasSubmitted(true);
    // Don't clear difficulty data here - it will be cleared when getting new questions
  };

  // Theme-based styling
  const cardStyle = {
    backgroundColor:
      mymode === "light"
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(26, 26, 46, 0.95)",
    backdropFilter: "blur(10px)",
    border:
      mymode === "light"
        ? "1px solid rgba(195, 20, 50, 0.1)"
        : "1px solid rgba(255, 107, 157, 0.2)",
    boxShadow:
      mymode === "light"
        ? "0 4px 20px rgba(195, 20, 50, 0.1)"
        : "0 4px 20px rgba(26, 26, 46, 0.3)",
  };

  // Loading state
  if (loadingGetQuestions) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            color: mymode === "light" ? "#c31432" : "#ff6b9d",
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: mymode === "light" ? "#c31432" : "#ff6b9d",
            fontWeight: "bold",
          }}
        >
          {t("difficulty.loading")}
        </Typography>
      </Box>
    );
  }

  // No data state
  if (!difficultyData || difficultyData.length === 0) {
    // Show "Get New Questions" button if hasSubmitted is true but no data
    if (hasSubmitted) {
      return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 3, textAlign: "center" }}>
          <Alert severity="info" sx={{ borderRadius: 2, mb: 3 }}>
            <Typography variant="body1">
              {t("difficulty.noQuestions")}
            </Typography>
          </Alert>
          <Button
            onClick={handleGetNewQuestions}
            variant="contained"
            disabled={isGettingNewQuestions}
            startIcon={
              isGettingNewQuestions ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                <RefreshIcon />
              )
            }
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#45a049",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
              },
              "&:disabled": {
                backgroundColor: "rgba(76, 175, 80, 0.5)",
              },
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            {isGettingNewQuestions
              ? t("difficulty.gettingNewQuestions", "Getting New Questions...")
              : t("difficulty.getNewQuestions", "Get New Questions")}
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          <Typography variant="body1">{t("difficulty.noQuestions")}</Typography>
        </Alert>
      </Box>
    );
  }

  const totalScore = difficultyData.reduce((total, q) => total + q.score, 0);
  const progressPercentage = (completedQuestions / difficultyData.length) * 100;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, sm: 3 } }}>
      {/* Score Dialog */}
      <Dialog
        open={showScoreDialog}
        onClose={handleCloseScoreDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            ...cardStyle,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: mymode === "light" ? "#c31432" : "#ff6b9d",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            🎉 {t("difficulty.results.title", "Quiz Results")}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: mymode === "light" ? "#4caf50" : "#66bb6a",
              fontWeight: "bold",
            }}
          >
            {scoreResults?.totalScore} / {scoreResults?.maxScore}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color:
                mymode === "light"
                  ? "rgba(0, 0, 0, 0.7)"
                  : "rgba(255, 255, 255, 0.7)",
              mt: 1,
            }}
          >
            {t("difficulty.results.subtitle", "Points Earned")}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            {scoreResults?.answers.map((isCorrect, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    backgroundColor: isCorrect
                      ? mymode === "light"
                        ? "rgba(76, 175, 80, 0.1)"
                        : "rgba(102, 187, 106, 0.1)"
                      : mymode === "light"
                      ? "rgba(244, 67, 54, 0.1)"
                      : "rgba(239, 83, 80, 0.1)",
                    border: `2px solid ${
                      isCorrect
                        ? mymode === "light"
                          ? "#4caf50"
                          : "#66bb6a"
                        : mymode === "light"
                        ? "#f44336"
                        : "#ef5350"
                    }`,
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    {/* Question Title */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      {isCorrect ? (
                        <CheckCircleIcon
                          sx={{
                            color: mymode === "light" ? "#4caf50" : "#66bb6a",
                            fontSize: 28,
                          }}
                        />
                      ) : (
                        <CancelIcon
                          sx={{
                            color: mymode === "light" ? "#f44336" : "#ef5350",
                            fontSize: 28,
                          }}
                        />
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            color:
                              mymode === "light"
                                ? "rgba(0, 0, 0, 0.9)"
                                : "rgba(255, 255, 255, 0.9)",
                          }}
                        >
                          {t("difficulty.question")} {index + 1}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isCorrect
                              ? mymode === "light"
                                ? "#4caf50"
                                : "#66bb6a"
                              : mymode === "light"
                              ? "#f44336"
                              : "#ef5350",
                            fontWeight: "bold",
                          }}
                        >
                          {isCorrect
                            ? t("difficulty.results.correct", "Correct")
                            : t("difficulty.results.incorrect", "Incorrect")}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${
                          isCorrect ? difficultyData[index].score : 0
                        } / ${difficultyData[index].score}`}
                        sx={{
                          backgroundColor: isCorrect
                            ? mymode === "light"
                              ? "#4caf50"
                              : "#66bb6a"
                            : mymode === "light"
                            ? "#f44336"
                            : "#ef5350",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>

                    {/* Question Text */}
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.7)"
                            : "rgba(255, 255, 255, 0.7)",
                        mb: 2,
                        fontStyle: "italic",
                        backgroundColor:
                          mymode === "light"
                            ? "rgba(0, 0, 0, 0.03)"
                            : "rgba(255, 255, 255, 0.03)",
                        p: 1.5,
                        borderRadius: 1,
                        borderLeft: `4px solid ${
                          mymode === "light" ? "#c31432" : "#ff6b9d"
                        }`,
                      }}
                    >
                      "{difficultyData[index].question}"
                    </Typography>

                    {/* Correct Answer Display - Only for incorrect answers */}
                    {!isCorrect && (
                      <Box
                        sx={{
                          backgroundColor:
                            mymode === "light"
                              ? "rgba(76, 175, 80, 0.1)"
                              : "rgba(102, 187, 106, 0.1)",
                          border: `1px solid ${
                            mymode === "light" ? "#4caf50" : "#66bb6a"
                          }`,
                          borderRadius: 2,
                          p: 2,
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color: mymode === "light" ? "#4caf50" : "#66bb6a",
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color: mymode === "light" ? "#4caf50" : "#66bb6a",
                            }}
                          >
                            {t(
                              "difficulty.results.correctAnswer",
                              "Correct Answer"
                            )}
                            :
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color:
                              mymode === "light"
                                ? "rgba(0, 0, 0, 0.8)"
                                : "rgba(255, 255, 255, 0.8)",
                            fontWeight: "bold",
                            backgroundColor:
                              mymode === "light"
                                ? "rgba(76, 175, 80, 0.05)"
                                : "rgba(102, 187, 106, 0.05)",
                            p: 1,
                            borderRadius: 1,
                            border: `1px dashed ${
                              mymode === "light" ? "#4caf50" : "#66bb6a"
                            }`,
                          }}
                        >
                          {difficultyData[index].correctAnswer}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Performance Summary */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                color: mymode === "light" ? "#c31432" : "#ff6b9d",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              {t("difficulty.results.performance", "Performance")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  mymode === "light"
                    ? "rgba(0, 0, 0, 0.7)"
                    : "rgba(255, 255, 255, 0.7)",
              }}
            >
              {scoreResults && (
                <>
                  {t("difficulty.results.correctAnswers", "Correct Answers")}:{" "}
                  {scoreResults.answers.filter(Boolean).length} /{" "}
                  {scoreResults.answers.length}
                  <br />
                  {t("difficulty.results.accuracy", "Accuracy")}:{" "}
                  {Math.round(
                    (scoreResults.answers.filter(Boolean).length /
                      scoreResults.answers.length) *
                      100
                  )}
                  %
                </>
              )}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={handleCloseScoreDialog}
            variant="contained"
            sx={{
              backgroundColor: mymode === "light" ? "#c31432" : "#ff6b9d",
              "&:hover": {
                backgroundColor: mymode === "light" ? "#a01729" : "#ff4081",
              },
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            {t("difficulty.results.close", "Close")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loading Overlay */}
      {(isSubmitting || isGettingNewQuestions) && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor:
              mymode === "light"
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(26, 26, 46, 0.8)",
          }}
          open={isSubmitting || isGettingNewQuestions}
        >
          <Box textAlign="center">
            <CircularProgress
              size={60}
              sx={{
                color: mymode === "light" ? "#c31432" : "#ff6b9d",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: mymode === "light" ? "#c31432" : "#ff6b9d",
                fontWeight: "bold",
              }}
            >
              {isSubmitting
                ? t("difficulty.submitting")
                : t("difficulty.gettingNewQuestions")}
            </Typography>
          </Box>
        </Backdrop>
      )}

      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 2,
          textAlign: "center",
          ...cardStyle,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: mymode === "light" ? "#c31432" : "#ff6b9d",
            fontWeight: "bold",
            textShadow:
              mymode === "light"
                ? "1px 1px 2px rgba(0,0,0,0.1)"
                : "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {t("difficulty.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color:
              mymode === "light"
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(255, 255, 255, 0.7)",
            mb: 2,
          }}
        >
          {t("difficulty.description")}
        </Typography>

        {/* Progress Indicator */}
        {!hasSubmitted && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {t("difficulty.progress")}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {completedQuestions} / {difficultyData.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  mymode === "light"
                    ? "rgba(195, 20, 50, 0.1)"
                    : "rgba(255, 107, 157, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        )}

        {/* Total Score */}
        <Chip
          label={`${t("difficulty.totalScore")}: ${totalScore} ${t(
            "difficulty.points"
          )}`}
          sx={{
            backgroundColor: mymode === "light" ? "#c31432" : "#ff6b9d",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            px: 2,
            py: 1,
          }}
        />
      </Paper>

      {/* Get New Questions Button - Enhanced Version */}
      {hasSubmitted && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            onClick={handleGetNewQuestions}
            variant="contained"
            disabled={isGettingNewQuestions}
            startIcon={
              isGettingNewQuestions ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                <RefreshIcon />
              )
            }
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#45a049",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
              },
              "&:disabled": {
                backgroundColor: "rgba(76, 175, 80, 0.5)",
              },
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              minWidth: 200,
            }}
          >
            {isGettingNewQuestions
              ? t("difficulty.gettingNewQuestions", "Getting New Questions...")
              : t("difficulty.getNewQuestions", "Get New Questions")}
          </Button>
        </Box>
      )}

      {/* Form */}
      {!hasSubmitted && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
          }: FormikProps<FormValues>) => (
            <Form>
              <Grid container spacing={3}>
                {difficultyData.map((questionData, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      elevation={2}
                      sx={{
                        borderRadius: 2,
                        transition:
                          "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow:
                            mymode === "light"
                              ? "0 8px 25px rgba(195, 20, 50, 0.15)"
                              : "0 8px 25px rgba(26, 26, 46, 0.4)",
                        },
                        ...cardStyle,
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        {/* Question Header */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 2,
                            flexDirection: isMobile ? "column" : "row",
                            gap: isMobile ? 1 : 0,
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              color: mymode === "light" ? "#c31432" : "#ff6b9d",
                              fontWeight: "bold",
                            }}
                          >
                            {t("difficulty.question")} {index + 1}
                          </Typography>
                          <Chip
                            label={`${questionData.score} ${t(
                              "difficulty.points"
                            )}`}
                            size="small"
                            sx={{
                              backgroundColor:
                                mymode === "light"
                                  ? "rgba(195, 20, 50, 0.1)"
                                  : "rgba(255, 107, 157, 0.1)",
                              color: mymode === "light" ? "#c31432" : "#ff6b9d",
                              fontWeight: "bold",
                            }}
                          />
                        </Box>

                        {/* Question Text */}
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                            color:
                              mymode === "light"
                                ? "rgba(0, 0, 0, 0.8)"
                                : "rgba(255, 255, 255, 0.8)",
                            fontWeight: 500,
                          }}
                        >
                          {questionData.question}
                        </Typography>

                        {/* Answer Input */}
                        <Field
                          as={TextField}
                          name={`question_${index}`}
                          label={t("difficulty.yourAnswer")}
                          fullWidth
                          variant="outlined"
                          value={values[`question_${index}`] || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleFieldChange(
                              values,
                              setFieldValue,
                              `question_${index}`,
                              e.target.value
                            )
                          }
                          error={
                            touched[`question_${index}`] &&
                            Boolean(errors[`question_${index}`])
                          }
                          helperText={
                            touched[`question_${index}`] &&
                            errors[`question_${index}`]
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "& fieldset": {
                                borderColor:
                                  mymode === "light"
                                    ? "rgba(195, 20, 50, 0.3)"
                                    : "rgba(255, 107, 157, 0.3)",
                              },
                              "&:hover fieldset": {
                                borderColor:
                                  mymode === "light" ? "#c31432" : "#ff6b9d",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor:
                                  mymode === "light" ? "#c31432" : "#ff6b9d",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color:
                                mymode === "light"
                                  ? "rgba(0, 0, 0, 0.6)"
                                  : "rgba(255, 255, 255, 0.6)",
                              "&.Mui-focused": {
                                color:
                                  mymode === "light" ? "#c31432" : "#ff6b9d",
                              },
                            },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Submit Button */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting || completedQuestions === 0}
                  sx={{
                    minWidth: 250,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: 2,
                    backgroundColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                    "&:hover": {
                      backgroundColor:
                        mymode === "light" ? "#a01729" : "#ff4081",
                      transform: "translateY(-1px)",
                      boxShadow:
                        mymode === "light"
                          ? "0 6px 20px rgba(195, 20, 50, 0.3)"
                          : "0 6px 20px rgba(255, 107, 157, 0.3)",
                    },
                    "&:disabled": {
                      backgroundColor:
                        mymode === "light"
                          ? "rgba(0, 0, 0, 0.12)"
                          : "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ mr: 1, color: "white" }}
                      />
                      {t("difficulty.submitting")}
                    </>
                  ) : (
                    t("difficulty.submitAnswers")
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default Difficulty;
