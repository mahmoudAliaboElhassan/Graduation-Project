import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getOffSideQuestions } from "../../../state/act/actGame";

function Offside() {
  const dispatch = useAppDispatch();
  const { grade } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      getOffSideQuestions({
        grade,
        subject: localStorage.getItem("subject") || "",
        chapter: localStorage.getItem("chapter") || "",
      })
    );
  }, []);
  return <div>Offside</div>;
}

export default Offside;
