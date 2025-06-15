import { useAppSelector } from "./redux";

function UseLoadingStatus() {
  const { loadingAuth, loadingForgetPassword } = useAppSelector(
    (state) => state.auth
  );
  const { loadingGetQuestions, loadingAnswerQuestion } = useAppSelector(
    (state) => state.game
  );
  const loadingStatus =
    loadingAuth ||
    loadingGetQuestions ||
    loadingAnswerQuestion ||
    loadingForgetPassword;
  return Boolean(loadingStatus);
}

export default UseLoadingStatus;
