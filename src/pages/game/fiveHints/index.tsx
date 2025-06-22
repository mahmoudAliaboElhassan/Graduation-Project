import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

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
  const { questionData, loadingGetQuestions, loadingAnswerQuestion } =
    useAppSelector((state) => state.game);
  const [second, setSecond] = useState<number>(0);
  const HINTTIME = 10;
  const [noOfHints, setNoOfHints] = useState<number>(0);
  const { t } = useTranslation();
  const { grade } = useAppSelector((state) => state.auth);
  const [flag, setFlage] = useState<boolean>(false);
  const { categoryGame } = useParams();

  const changeFlag = () => {
    setFlage((prevFlag) => !prevFlag);
  };

  const resetSeconds = () => {
    setTimeout(() => {
      setNoOfHints(0);
      setSecond(0);
    }, 1500);
  };

  useEffect(() => {
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
  }, [dispatch, flag]);
  const hasQuestionData =
    questionData && questionData.hints && Array.isArray(questionData.hints);

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
  }, [second, loadingGetQuestions, loadingAnswerQuestion]);

  useEffect(() => {
    return () => {
      dispatch(clearHintsData());
    };
  }, [dispatch]);

  // Check if questionData and hints exist

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Container>
        <Timer timeExceeded={second > 4 * HINTTIME}>{second}</Timer>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {loadingGetQuestions ? (
            // Show loading state with "hint" text
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
            // Show "no question" message when loading is finished but no question data
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

        <QuestionAnswer
          hints={noOfHints}
          submit={changeFlag}
          resetSeconds={resetSeconds}
        />
      </Container>
    </motion.div>
  );
}

export default withGuard(FiveHints);
