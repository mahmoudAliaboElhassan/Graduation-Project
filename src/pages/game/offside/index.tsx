import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getOffSideQuestions } from "../../../state/slices/game";
import { Hint, Timer } from "../../../styles/games/five-hints";
import RadioInput from "../../../components/formUI/offsideInput";
import UseFormValidation from "../../../hooks/use-form-validation";
import UseInitialValues from "../../../hooks/use-initial-values";
import withGuard from "../../../utils/withGuard";

function Offside() {
  const dispatch = useAppDispatch();
  const { grade } = useAppSelector((state) => state.auth);
  const { offsideInformation, offsideCorrectAnswer } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(
      getOffSideQuestions({
        grade,
        subject: localStorage.getItem("subject") || "",
        chapter: localStorage.getItem("chapter") || "",
        userID: localStorage.getItem("id") || "",
      })
    );
  }, [dispatch, grade]);

  const { FORM_VALIDATION_OFFSIDE_GAME } = UseFormValidation();
  const { INITIAL_FORM_STATE_OFFSIDE_GAME } = UseInitialValues();

  const [disabledFields, setDisabledFields] = useState<Record<string, boolean>>(
    {}
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Container>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE_OFFSIDE_GAME }}
          validationSchema={FORM_VALIDATION_OFFSIDE_GAME}
          onSubmit={(values) => {
            console.log("Form submitted", values);
          }}
        >
          {({ isValid, dirty }) => (
            <Form>
              <Timer timeExceeded={true}>{"second"}</Timer>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                {offsideInformation.map((info, index) => {
                  const fieldName = `question${index + 1}`;
                  return (
                    <Hint size={{ xs: 6 }} key={index}>
                      <motion.div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "3px solid white",
                          borderRadius: "8px",
                          padding: "8px",
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                          {info}
                        </span>
                        <RadioInput
                          name={fieldName}
                          index={index + 1}
                          disabled={!!disabledFields[fieldName]}
                          setDisabledFields={setDisabledFields}
                        />
                        <ErrorMessage name={fieldName} component="div" />
                      </motion.div>
                    </Hint>
                  );
                })}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                style={{ display: "flex", margin: "auto" }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </motion.div>
  );
}

export default withGuard(Offside);
// 1. !!disabledFields[fieldName] (Double Bang !!)
// This is a common JavaScript trick to convert a value into a boolean.

// 2. dirty in Formik
// dirty is a Formik property that checks if the form values have changed from their initial values.
