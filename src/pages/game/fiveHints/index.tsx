import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { ExitToApp } from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getHintsQuestions,
  getHintsEntertainment,
  clearHintsData,
} from "../../../state/slices/game";
import { Hint, Timer } from "../../../styles/games/five-hints";
import QuestionAnswer from "../../../components/formUI/formAnswer";
import withGuard from "../../../utils/withGuard";

function FiveHints() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    questionData,
    loadingGetQuestions,
    loadingAnswerQuestion,
    question,
    summary,
  } = useAppSelector((state) => state.game);
  const [second, setSecond] = useState<number>(0);
  const HINTTIME = 10;
  const [noOfHints, setNoOfHints] = useState<number>(0);
  const { t } = useTranslation();
  const { grade } = useAppSelector((state) => state.auth);
  const [showNewQuestionButton, setShowNewQuestionButton] =
    useState<boolean>(false);
  const { categoryGame } = useParams();

  const getNewQuestion = () => {
    setShowNewQuestionButton(false);
    setSecond(0);
    setNoOfHints(0);

    categoryGame == "education"
      ? dispatch(
          getHintsQuestions({
            grade,
            subject: localStorage.getItem("subject") || "",
            chapter: localStorage.getItem("chapter") || "",
            userID: localStorage.getItem("id") || "",
          })
        )
      : dispatch(
          getHintsEntertainment({
            entertainmentSection:
              Number(localStorage.getItem("entertainmentGameId")) || 0,
          })
        );
  };
  const theme = useTheme();

  const handleExitGame = () => {
    // Clear game data before navigating
    dispatch(clearHintsData());
    // Navigate to games page
    navigate("/games");
  };

  const onAnswerSubmitted = () => {
    setShowNewQuestionButton(true);
  };

  const resetSeconds = () => {
    setTimeout(() => {
      setNoOfHints(0);
      setSecond(0);
    }, 1500);
  };

  useEffect(() => {
    // Initial load
    categoryGame == "education"
      ? dispatch(
          getHintsQuestions({
            grade,
            subject: localStorage.getItem("subject") || "",
            chapter: localStorage.getItem("chapter") || "",
            userID: localStorage.getItem("id") || "",
          })
        )
      : dispatch(
          getHintsEntertainment({
            entertainmentSection:
              Number(localStorage.getItem("entertainmentGameId")) || 0,
          })
        );
  }, [dispatch]);

  const hasQuestionData =
    questionData &&
    questionData.hints &&
    Array.isArray(questionData.hints) &&
    questionData.hints.length > 0;

  useEffect(() => {
    if (!loadingGetQuestions && !loadingAnswerQuestion && hasQuestionData) {
      const interval = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond >= 4 * HINTTIME + 1) {
            clearInterval(interval);
            return prevSecond;
          }
          setNoOfHints(Math.ceil(second / HINTTIME));
          console.log("no.hints", noOfHints);
          return prevSecond + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [second, loadingGetQuestions, loadingAnswerQuestion, hasQuestionData]);

  useEffect(() => {
    return () => {
      dispatch(clearHintsData());
    };
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Container>
        {/* Exit Game Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleExitGame}
            startIcon={<ExitToApp />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              marginTop: "8px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderColor: "red",
                color: "red",
              },
            }}
          >
            {/* {t("exitGame", "Exit Game")} */}
          </Button>
        </Box>

        <Timer timeExceeded={second > 4 * HINTTIME}>{second}</Timer>
        <Card
          elevation={4}
          sx={{
            backgroundColor: "#eee",
            borderRadius: 3,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
            p: 3,
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={700}
              align="center"
              color="black"
              gutterBottom
            >
              {question
                ? question
                : loadingGetQuestions
                ? t("wait-question")
                : t("noQuestion", "No question available")}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {loadingGetQuestions || showNewQuestionButton ? (
            // Show loading state or waiting for new question with "hint" text
            Array.from({ length: 5 }, (_, index) => (
              <Hint size={{ xs: index === 4 ? 12 : 6 }} key={index}>
                <motion.div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "3px solid white",
                    borderRadius: "8px",
                    padding: "8px",
                    backgroundColor: "#eee",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                    }}
                  >
                    {t("hint")}
                  </span>
                </motion.div>
              </Hint>
            ))
          ) : !hasQuestionData ? (
            // Show "no question" message when loading is finished but no question data and not waiting for new question
            <Grid size={12}>
              <motion.div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ textAlign: "center", color: "#666" }}
                >
                  {t("noQuestion", "No question available")}
                </Typography>
              </motion.div>
            </Grid>
          ) : (
            // Show hints when question data exists
            questionData.hints.map((hint, index) => {
              const isFlipping = second / HINTTIME > index;
              return (
                <Hint size={{ xs: index === 4 ? 12 : 6 }} key={index}>
                  <motion.div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "3px solid white",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: isFlipping ? "#4caf50" : "#eee",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateY: isFlipping ? 360 : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: isFlipping ? "white" : "black",
                      }}
                    >
                      {isFlipping ? hint : t("hint")}
                    </span>
                  </motion.div>
                </Hint>
              );
            })
          )}
        </Grid>

        {showNewQuestionButton && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={getNewQuestion}
              disabled={loadingGetQuestions}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {loadingGetQuestions
                ? t("loading", "Loading...")
                : t("newQuestion", "New Question")}
            </Button>
          </div>
        )}

        <QuestionAnswer
          hints={noOfHints}
          onAnswerSubmitted={onAnswerSubmitted}
          resetSeconds={resetSeconds}
        />
      </Container>
    </motion.div>
  );
}

export default withGuard(FiveHints);
