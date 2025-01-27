import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import UseInitialValues from "../../../hooks/use-initial-values";
import UseFormValidation from "../../../hooks/use-form-validation";
import TextFieldWrapper from "../textField";
import ButtonWrapper from "../submit";

function QuestionAnswer() {
  const { INITIAL_FORM_STATE_ANSWER_QUESTION } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ANSWER_QUESTION } = UseFormValidation();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE_ANSWER_QUESTION,
      }}
      validationSchema={FORM_VALIDATION_SCHEMA_ANSWER_QUESTION}
      onSubmit={async (values) => {
        console.log(values);
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
