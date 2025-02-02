import React from "react";
import { useAppSelector } from "./redux";

function UseLoadingStatus() {
  const { loadingAuth } = useAppSelector((state) => state.auth);
  const { loadingGetQuestions } = useAppSelector((state) => state.game);
  const loadingStatus = loadingAuth || loadingGetQuestions;
  return Boolean(loadingStatus);
}

export default UseLoadingStatus;
