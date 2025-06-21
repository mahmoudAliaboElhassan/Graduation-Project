"use client";

import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import {
  Container,
  Button,
  Box,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getOffsideEntertainment,
  getOffSideQuestions,
} from "../../../state/slices/game";
import { Hint, Timer } from "../../../styles/games/five-hints";
import RadioInput from "../../../components/formUI/offsideInput";
import UseFormValidation from "../../../hooks/use-form-validation";
import UseInitialValues from "../../../hooks/use-initial-values";
import withGuard from "../../../utils/withGuard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addPoints } from "../../../state/act/actAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ButtonWrapper from "../../../components/formUI/submit";

function Offside() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { grade } = useAppSelector((state) => state.auth);
  const { mymode } = useAppSelector((state) => state.mode);
  const { offsideInformation, loadingGetQuestions } = useAppSelector(
    (state) => state.game
  );
  const { categoryGame } = useParams();

  const [disabledFields, setDisabledFields] = useState<Record<string, boolean>>(
    {}
  );
  const [answerStatus, setAnswerStatus] = useState<Record<string, boolean>>({});
  const [totalPoints, setTotalPoints] = useState(50);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [refreshQuestions, setRefreshQuestions] = useState(false);

  const { FORM_VALIDATION_OFFSIDE_GAME } = UseFormValidation();
  const { INITIAL_FORM_STATE_OFFSIDE_GAME } = UseInitialValues();

  const resetGameState = () => {
    setTotalPoints(50);
    setAnsweredQuestions(0);
    setAnswerStatus({});
    setDisabledFields({});
  };

  const handleAnswerSubmit = (questionName: string, isCorrect: boolean) => {
    setAnsweredQuestions((prev) => prev + 1);
    setAnswerStatus((prev) => ({ ...prev, [questionName]: isCorrect }));

    if (!isCorrect) {
      setTotalPoints((prev) => Math.floor(prev / 2));
    }
  };

  useEffect(() => {
    categoryGame === "education"
      ? dispatch(
          getOffSideQuestions({
            grade,
            subject: localStorage.getItem("subject") || "",
            chapter: localStorage.getItem("chapter") || "",
            userID: localStorage.getItem("id") || "",
          })
        )
      : dispatch(
          getOffsideEntertainment({
            entertainmentSection:
              Number(localStorage.getItem("entertainmentGameId")) || 0,
          })
        );
  }, [categoryGame, grade, refreshQuestions]);

  useEffect(() => {
    if (offsideInformation.length > 0) {
      resetGameState();
    }
  }, [offsideInformation]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = t("leave-game-warning") || "Are you sure?";
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "F5" ||
        (event.ctrlKey && event.key.toLowerCase() === "r")
      ) {
        event.preventDefault();
        alert(t("refresh-disabled") || "Page refresh is disabled!");
      }
    };
    const handleContextMenu = (event: MouseEvent) => event.preventDefault();

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [t]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Container>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              textAlign: "center",
              color: "#fff",
              bgcolor: "inherit",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {t("total-points") || "Total Points"}: {totalPoints}
            </Typography>
            <Typography variant="body2">
              {t("questions-answered") || "Questions Answered"}:{" "}
              {answeredQuestions}/{offsideInformation.length}
            </Typography>
          </Paper>

          <Formik
            initialValues={{ ...INITIAL_FORM_STATE_OFFSIDE_GAME }}
            validationSchema={FORM_VALIDATION_OFFSIDE_GAME}
            onSubmit={(values, { setFieldValue }) => {
              dispatch(addPoints({ points: totalPoints }))
                .unwrap()
                .then((result) => {
                  toast.success(
                    t(
                      "points-added-success",
                      "{{points}} points added successfully! Total: {{totalPoints}}",
                      {
                        points: totalPoints,
                        totalPoints: result.totalpoints,
                      }
                    )
                  );
                  Object.keys(values).forEach((key) => {
                    setFieldValue(key, "");
                  });
                  setDisabledFields({});
                  setAnswerStatus({});
                  setRefreshQuestions((prev) => !prev);
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
            }}
          >
            {({ isValid, dirty }) => (
              <Form>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {offsideInformation.map((info, index) => {
                    const fieldName = `question${index + 1}`;
                    return (
                      <Hint size={{ xs: 6 }} key={index}>
                        <motion.div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "3px solid white",
                            borderRadius: "8px",
                            padding: "8px",
                            position: "relative",
                          }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                          {disabledFields[fieldName] && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: answerStatus[fieldName]
                                  ? "success.main"
                                  : "error.main",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                              }}
                            >
                              {answerStatus[fieldName]
                                ? t("correct-ans")
                                : t("false-ans")}
                            </Box>
                          )}

                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "18px",
                              marginTop: "20px",
                            }}
                          >
                            {info}
                          </span>
                          <RadioInput
                            name={fieldName}
                            index={index}
                            disabled={!!disabledFields[fieldName]}
                            setDisabledFields={setDisabledFields}
                            onAnswerSubmit={handleAnswerSubmit}
                          />
                          {/* <ErrorMessage name={fieldName} component="div" /> */}
                        </motion.div>
                      </Hint>
                    );
                  })}
                </Grid>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <ButtonWrapper
                    variant="contained"
                    color="primary"
                    disabled={
                      !dirty ||
                      !isValid ||
                      answeredQuestions !== offsideInformation.length
                    }
                    sx={{
                      minWidth: 200,
                      height: 48,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {answeredQuestions === offsideInformation.length
                      ? t("submit-final-answer") || "Submit Final Answer"
                      : t("answer-all-questions") ||
                        `Answer All Questions (${answeredQuestions}/${offsideInformation.length})`}
                  </ButtonWrapper>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </motion.div>

      {loadingGetQuestions && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:
              mymode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(26, 26, 46, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
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
              {t("loading-offside") || "Loading questions..."}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default withGuard(Offside);
