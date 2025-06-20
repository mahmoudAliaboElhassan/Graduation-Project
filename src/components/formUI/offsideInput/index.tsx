import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../hooks/redux";

interface RadioInputProps {
  name: string;
  index: number;
  disabled: boolean;
  setDisabledFields: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  onAnswerSubmit: (questionName: string, isCorrect: boolean) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  index,
  disabled,
  setDisabledFields,
  onAnswerSubmit,
}) => {
  const { offsideCorrectAnswer } = useAppSelector((state) => state.game);
  const { t } = useTranslation();

  // Convert zero-based index to one-based for comparison with offsideCorrectAnswer array
  const questionNumber = index + 1;

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    form: any
  ) => {
    if (disabled) return;

    const { name, value } = event.target;
    const userAnswer = value === "true";

    // Set form value and disable the field
    form.setFieldValue(name, value);
    setDisabledFields((prev) => ({ ...prev, [name]: true }));

    // Check if answer is correct
    const isCorrectAnswer = offsideCorrectAnswer.includes(questionNumber);
    const isUserAnswerCorrect = userAnswer === isCorrectAnswer;

    // Debug logging
    console.log({
      questionNumber,
      userAnswer,
      isCorrectAnswer,
      isUserAnswerCorrect,
      offsideCorrectAnswer,
    });

    // Call the parent's answer submit handler with the result
    onAnswerSubmit(name, isUserAnswerCorrect);

    if (isUserAnswerCorrect) {
      console.log(
        `Question ${questionNumber}: Correct answer! Points maintained.`
      );
    } else {
      console.log(
        `Question ${questionNumber}: Incorrect answer. Points will be halved.`
      );
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <RadioGroup
          row
          {...field}
          onChange={(event) => handleRadioChange(event, form)}
        >
          <FormControlLabel
            value="true"
            control={<Radio disabled={disabled} />}
            label={t("correct-info")}
          />
          <FormControlLabel
            value="false"
            control={<Radio disabled={disabled} />}
            label={t("false-info")}
          />
        </RadioGroup>
      )}
    </Field>
  );
};

export default RadioInput;
