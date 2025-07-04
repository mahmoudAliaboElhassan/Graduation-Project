import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import UseInitialValues from "../../../hooks/use-initial-values";
import UseFormValidation from "../../../hooks/use-form-validation";
import TextFieldWrapper from "../textField";
import { answerQuestion } from "../../../state/act/actGame";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ButtonWrapper from "../submit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { addPoints } from "../../../state/act/actAuth";
import { clearHintsData } from "../../../state/slices/game";
import { useParams } from "react-router-dom";

interface Props {
  hints: number;
  onAnswerSubmitted: () => void;
  resetSeconds: () => void;
}

interface FormValues {
  answer: string;
}

const POINTS_BASE = 50;
const POINTS_HINT_PENALTY = 10;
const POINTS_DELAY_MS = 1500;

function QuestionAnswer({ hints, onAnswerSubmitted, resetSeconds }: Props) {
  const { INITIAL_FORM_STATE_ANSWER_QUESTION } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ANSWER_QUESTION } = UseFormValidation();
  const { questionData, correct, summary } = useAppSelector(
    (state) => state.game
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const calculatePoints = useCallback(() => {
    return POINTS_BASE - (hints - 1) * POINTS_HINT_PENALTY;
  }, [hints]);
  const { categoryGame } = useParams();

  const handlePointsAddition = useCallback(async () => {
    const pointsToAdd = calculatePoints();
    if (categoryGame === "education") {
      try {
        const result = await dispatch(
          addPoints({ points: pointsToAdd })
        ).unwrap();
        toast.success(
          t(
            "points-added-success",
            "{{points}} points added successfully! Total: {{totalPoints}}",
            {
              points: pointsToAdd,
              totalPoints: result.totalpoints,
            }
          )
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("error", "Error"),
          text: t(
            "failed-to-add-points",
            "Failed to add points. Please try again."
          ),
        });
      }
    } else {
      toast.success(
        t(
          "points-added-success-entertainment",
          "{{points}} points added successfully!",
          {
            points: pointsToAdd,
          }
        )
      );
    }
  }, [dispatch, calculatePoints, t]);

  const handleCorrectAnswer = useCallback(() => {
    setTimeout(() => {
      handlePointsAddition();
    }, POINTS_DELAY_MS);
  }, [handlePointsAddition]);

  const handleIncorrectAnswer = useCallback(() => {
    Swal.fire({
      title: t("answered-false", "إجابة خاطئة"),
      html: t("incorrect-answer-with-correct", {
        correctAnswer: questionData.correctAnswer,
        summary: summary || "",
      }),
      icon: "error",
      confirmButtonText: t("ok", "حسنًا"),
    });
  }, [t, questionData.correctAnswer]);

  const handleAnswerSubmissionError = useCallback(() => {
    Swal.fire({
      title: t("error-submitting-answer"),
      icon: "error",
      confirmButtonText: t("ok"),
    });
  }, [t]);

  const handleSubmit = useCallback(
    async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
      console.log("Answer submitted:", values);
      console.log("Hints used:", hints);
      console.log("correct", questionData.correctAnswer);

      dispatch(
        answerQuestion({
          answer: values.answer,
          correctanswer: questionData.correctAnswer,
          hints: questionData.hints.join(","),
        })
      )
        .unwrap()
        .then((res) => {
          console.log("Response:", res);
          resetSeconds();
          resetForm();
          dispatch(clearHintsData());

          if (res) {
            handleCorrectAnswer();
            if (summary) {
              if (categoryGame === "education") {
                Swal.fire({
                  icon: "info",
                  title: t("educational-summary-title", "Educational Summary"),
                  text: summary,
                  confirmButtonText: t("ok", "OK"),
                });
              } else {
                toast.info(
                  t(
                    "entertainment-summary-message",
                    "Did you know? {{summary}}",
                    {
                      summary,
                    }
                  )
                );
              }
            }
          } else {
            handleIncorrectAnswer();
          }

          // Trigger the callback to show new question button
          onAnswerSubmitted();
        })
        .catch((error: unknown) => {
          console.error("Error submitting answer:", error);
          handleAnswerSubmissionError();
        });
    },
    [
      dispatch,
      questionData.correctAnswer,
      hints,
      correct,
      handleCorrectAnswer,
      handleIncorrectAnswer,
      handleAnswerSubmissionError,
      onAnswerSubmitted,
      resetSeconds,
    ]
  );

  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Formik
        initialValues={INITIAL_FORM_STATE_ANSWER_QUESTION}
        validationSchema={FORM_VALIDATION_SCHEMA_ANSWER_QUESTION}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <TextFieldWrapper name="answer" label={t("question-answer")} />
            <ButtonWrapper>{t("answer-question")}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default QuestionAnswer;
