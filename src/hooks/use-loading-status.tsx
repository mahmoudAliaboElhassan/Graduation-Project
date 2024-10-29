import React from "react";
import { useAppSelector } from "./redux";

function UseLoadingStatus() {
  const { loadingAuth } = useAppSelector((state) => state.auth);
  const loadingStatus = loadingAuth;
  return Boolean(loadingStatus);
}

export default UseLoadingStatus;
