import { useAppSelector } from "./redux";

function UseLoadingStatus() {
  const {
    loadingAuth,
    loadingForgetPassword,
    loadingResetPassword,
    loadingAddPoints,
    loadingChangePassword,
  } = useAppSelector((state) => state.auth);
  const { loadingAnswerQuestion } = useAppSelector((state) => state.game);

  const {
    loadingAddGrade,
    loadingAddSubject,
    loadingAddChapter,
    loadinAddGradeSubjects,
  } = useAppSelector((state) => state.admin);

  const loadingStatus =
    loadingAuth ||
    loadingAnswerQuestion ||
    loadingResetPassword ||
    loadingForgetPassword ||
    loadingAddPoints ||
    loadingAddGrade ||
    loadingAddSubject ||
    loadingAddChapter ||
    loadinAddGradeSubjects ||
    loadingChangePassword;
  return Boolean(loadingStatus);
}

export default UseLoadingStatus;
