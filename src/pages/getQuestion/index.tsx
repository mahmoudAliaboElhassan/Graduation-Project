import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { answerQuestion, getQuestion } from "../../state/slices/game";

function GetQuestion() {
  const dispatch = useAppDispatch();

  return (
    <div>
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
              hintsused: 1
            })
          );
        }}
      >
        answer
      </button>
    </div>
  );
}

export default GetQuestion;
