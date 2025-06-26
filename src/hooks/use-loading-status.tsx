import { useAppSelector } from "./redux";

function UseLoadingStatus() {
  const {
    loadingAuth,
    loadingForgetPassword,
    loadingResetPassword,
    loadingAddPoints,
    loadingChangePassword,
  } = useAppSelector((state) => state.auth);
  const { loadingGetQuestions, loadingAnswerQuestion } = useAppSelector(
    (state) => state.game
  );

  const { loadingAddGrade, loadingAddSubject, loadingAddChapter } =
    useAppSelector((state) => state.admin);

  const loadingStatus =
    loadingAuth ||
    loadingGetQuestions ||
    loadingAnswerQuestion ||
    loadingResetPassword ||
    loadingForgetPassword ||
    loadingAddPoints ||
    loadingAddGrade ||
    loadingAddSubject ||
    loadingAddChapter ||
    loadingChangePassword;
  return Boolean(loadingStatus);
}

export default UseLoadingStatus;
