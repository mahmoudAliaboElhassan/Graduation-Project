import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
} from "formik";
import { useNavigate, useParams } from "react-router-dom";

import UseInitialValues from "../../../../hooks/use-initial-values";
import UseFormValidation from "../../../../hooks/use-form-validation";
import SelectComponent from "../../../../components/formUI/select";
import UseSubjects from "../../../../hooks/use-subjects";
import { useTranslation } from "react-i18next";
import ButtonWrapper from "../../../../components/formUI/submit";
import UseChapter from "../../../../hooks/use-chapter";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getSubjects, getChapters } from "../../../../state/slices/auth";

const { FORM_VALIDATION_SCHEMA_GET_QUESTIONS } = UseFormValidation();

const steps = ["Select Subject", "Select Chapter"];

const MultiStepModal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { INITIAL_FORM_STATE_GET_QUESTIONS } = UseInitialValues();
  // const { Chapters } = UseChapter();
  // const { subjects } = UseSubjects();
  const { t } = useTranslation();
  const { grade, subjects, chapters } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubjects({ grade: grade ? +grade : 1 }));
  }, [dispatch]);

  const handleNext = (
    values: { subject: any; chapter: string },
    setTouched: {
      (
        touched: FormikTouched<{ subject: string; chapter: string }>,
        shouldValidate?: boolean
      ): Promise<void | FormikErrors<{ subject: string; chapter: string }>>;
      (arg0: { subject?: boolean; chapter?: boolean }): void;
    },
    setErrors: {
      (errors: FormikErrors<{ subject: string; chapter: string }>): void;
      (arg0: { subject?: string; chapter?: string }): void;
    }
  ) => {
    if (activeStep === 0 && !values.subject) {
      setTouched({ subject: true });
      setErrors({ subject: "Subject Field is required" });
      return;
    } else if (activeStep === 0 && values.subject) {
      dispatch(
        getChapters({ grade: grade ? +grade : 1, subject: values.subject })
      );
    }
    if (activeStep === 1 && !values.chapter) {
      setTouched({ chapter: true });
      setErrors({ chapter: "Chapter Field is required" });
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const navigate = useNavigate();
  const params = useParams();
  console.log("params", params);
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Modal
        open={true}
        // onClose={onClose}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" align="center" mb={2}>
            {t("get-question-heading")}
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Formik
            initialValues={INITIAL_FORM_STATE_GET_QUESTIONS}
            validationSchema={FORM_VALIDATION_SCHEMA_GET_QUESTIONS}
            onSubmit={(values) => {
              console.log("Form Submitted", values);
              localStorage.setItem("subject", values.subject);
              localStorage.setItem("chapter", values.chapter);
              navigate(`/${params.gameType}`);
            }}
          >
            {({ values, setTouched, setErrors }) => (
              <Form>
                {activeStep === 0 && (
                  <Box mt={2}>
                    <SelectComponent
                      name="subject"
                      options={subjects as any}
                      label={t("select-subject")}
                    />
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box mt={2}>
                    <SelectComponent
                      name="chapter"
                      options={chapters as any}
                      label={t("select-chapter")}
                    />
                  </Box>
                )}

                <Box mt={3} display="flex" justifyContent="space-between">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    {t("back")}
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <ButtonWrapper>{t("get-questions")}</ButtonWrapper>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleNext(values, setTouched, setErrors)}
                    >
                      {t("next")}
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default MultiStepModal;
