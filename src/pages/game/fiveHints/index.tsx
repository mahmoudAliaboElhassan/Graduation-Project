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
} from "../../../state/slices/game";
import { Hint, Timer } from "../../../styles/games/five-hints";
import QuestionAnswer from "../../../components/formUI/formAnswer";

function FiveHints() {
  const dispatch = useAppDispatch();
  const { questionData, loadingGetQuestions } = useAppSelector(
    (state) => state.game
  );
  const [second, setSecond] = useState<number>(0);
  const HINTTIME = 30;
  const [noOfHints, setNoOfHints] = useState<number>(0);
  const { t } = useTranslation();
  const { grade } = useAppSelector((state) => state.auth);

  const { categoryGame } = useParams();

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
  }, []);

  useEffect(() => {
    if (!loadingGetQuestions) {
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
  }, [second, loadingGetQuestions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {/* <div>
        <button
          onClick={() => {
            dispatch(
              getQuestion({
                grade: "one",
                subject: "science",
                chapter: "one",
              })
            );
          }}
        >
          Get Question
        </button>
        <button
          onClick={() => {
            dispatch(
              answerQuestion({
                answer: "الزعيم سعد زغلول",
                hintsused: 1,
                correctanswer: questionData.correctAnswer,
              })
            );
          }}
        >
          Answer
        </button>
      </div> */}
      <Container>
        <Timer timeExceeded={second > 4 * HINTTIME}>{second}</Timer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {Array.from({ length: 5 }, (_, index) => {
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
                    {isFlipping && !loadingGetQuestions && questionData
                      ? questionData.hints[index]
                      : t("hint")}
                  </span>
                </motion.div>
              </Hint>
            );
          })}
        </Grid>
        <QuestionAnswer hints={noOfHints} />
      </Container>
    </motion.div>
  );
}

export default FiveHints;
