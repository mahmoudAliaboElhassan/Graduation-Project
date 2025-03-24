import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

interface RadioInputProps {
  name: string;
  index: number;
  disabled: boolean;
  setDisabledFields: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  index,
  disabled,
  setDisabledFields,
}) => {
  const correct = [1, 3, 5];
  const { t } = useTranslation();
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <RadioGroup
          row
          {...field}
          onChange={(event) => {
            if (!disabled) {
              const { name, value } = event.target;
              form.setFieldValue(name, value);
              console.log("index", index);
              console.log("name", name);
              console.log("value", event.target.value);
              setDisabledFields((prev) => ({ ...prev, [name]: true }));
              if (
                (value === "true" && correct.includes(index)) ||
                (value === "false" && !correct.includes(index))
              ) {
                console.log("correct answer");
              } else {
                console.log("false answer");
              }
            }
          }}
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
