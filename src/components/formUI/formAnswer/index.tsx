import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import UseInitialValues from "../../../hooks/use-initial-values";
import UseFormValidation from "../../../hooks/use-form-validation";
import TextFieldWrapper from "../textField";
import { answerQuestion } from "../../../state/act/actGame";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ButtonWrapper from "../submit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

interface Props {
  hints: number;
}
function QuestionAnswer({ hints }: Props) {
  const { INITIAL_FORM_STATE_ANSWER_QUESTION } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ANSWER_QUESTION } = UseFormValidation();
  const { questionData } = useAppSelector((state) => state.game);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE_ANSWER_QUESTION,
      }}
      validationSchema={FORM_VALIDATION_SCHEMA_ANSWER_QUESTION}
      onSubmit={async (values) => {
        console.log(values);
        console.log("hints", hints);
        dispatch(
          answerQuestion({
            answer: values.answer,
            hintsused: hints,
            correctanswer: questionData.correctAnswer,
          })
        )
          .unwrap()
          .then(() => {
            {
              toast.success(t("answer-submitted"), {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((error: AxiosError) => {
            Swal.fire({
              title: t("error-submitting-answer"),
              icon: "error",
              confirmButtonText: t("ok"),
            });
          }); // setLoading(true);
      }}
    >
      {() => (
        <Form>
          <TextFieldWrapper name="answer" label={t("question-answer")} />
          <ButtonWrapper>{t("answer-question")}</ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
}

export default QuestionAnswer;
