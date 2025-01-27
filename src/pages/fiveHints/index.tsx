import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { Container, TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { answerQuestion, getQuestion } from "../../state/slices/game";
import { Hint, Timer } from "../../styles/games/five-hints";
import QuestionAnswer from "../../components/formUI/formAnswer";

function FiveHints() {
  const dispatch = useAppDispatch();
  const [second, setSecond] = useState<number>(0);
  const HINTTIME = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond >= 5 * HINTTIME + 1) {
          clearInterval(interval);
          return prevSecond;
        }
        return prevSecond + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
                answer: "سعد زغلول",
                hintsused: 1,
              })
            );
          }}
        >
          Answer
        </button>
      </div> */}
      <Container>
        <Timer timeExceeded={second > 26}>{second}</Timer>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {Array.from({ length: 6 }, (_, index) => {
            const isFlipping = second / HINTTIME > index;

            return (
              <Hint size={{ xs: 6 }} key={index}>
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
                    {isFlipping ? "Saad Zaglol" : "Hint"}
                  </span>
                </motion.div>
              </Hint>
            );
          })}
        </Grid>
        <QuestionAnswer />
      </Container>
    </>
  );
}

export default FiveHints;
