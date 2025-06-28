import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Stack,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as Yup from "yup";
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import UseThemMode from "../../../hooks/use-theme-mode";
import { ContainerFormWrapper, FormWrapper } from "../../../styles/forms";
import { useAppDispatch } from "../../../hooks/redux";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { HeadingElement } from "../../../styles/heading";
import TextFieldWrapper from "../../../components/formUI/textField";
import ButtonWrapper from "../../../components/formUI/submit";
import withGuard from "../../../utils/withGuard";
import Swal from "sweetalert2";
import { addSubject } from "../../../state/act/actAdmin";
import UseInitialValues from "../../../hooks/use-initial-values";
import UseFormValidation from "../../../hooks/use-form-validation";
import UseDirection from "../../../hooks/use-direction";

interface FormValues {
  name: string;
  image: File | null;
}

export default function AddSubject() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { themeMode } = UseThemMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { InitialValuesAddSubject } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_ADD_Subject } = UseFormValidation();
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const { direction } = UseDirection();

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <ContainerFormWrapper maxWidth="sm">
          <Formik
            initialValues={InitialValuesAddSubject}
            validationSchema={FORM_VALIDATION_SCHEMA_ADD_Subject}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log(values);
              try {
                await dispatch(
                  addSubject({
                    name: values.name,
                    image: values.image!,
                  })
                ).unwrap();

                toast.success(
                  t("subject-added") || "Subject added successfully!",
                  {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );

                resetForm();
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              } catch (error: any) {
                if (error?.response?.status === 401) {
                  Swal.fire({
                    title: t("error-add-subject") || "Error Adding Subject",
                    text:
                      t("error-add-subject-text") ||
                      "An error occurred while adding the subject",
                    icon: "error",
                    confirmButtonText: t("ok") || "OK",
                  });
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, errors, touched, isSubmitting }) => (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Form>
                  <FormWrapper>
                    <HeadingElement>
                      {t("add-subject-now") || "Add New Subject"}
                    </HeadingElement>

                    <Grid container spacing={3}>
                      {/* Subject Name Field */}
                      <Grid size={{ xs: 12 }}>
                        <TextFieldWrapper
                          name="name"
                          label={t("subject-name") || "Subject Name"}
                        />
                      </Grid>

                      {/* Image Upload Section */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          color="text.secondary"
                          sx={{ mb: 2, color: "white" }}
                        >
                          {t("subject-image") || "Subject Image"} *
                        </Typography>

                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFieldValue("image", file);
                          }}
                          accept="image/*"
                          style={{ display: "none" }}
                        />

                        {/* Upload Buttons */}
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{
                            mb: 4,
                            width: "fit-content",
                            margin: "auto",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={handleFileUpload}
                            disabled={isSubmitting}
                            sx={{
                              borderStyle: "dashed",
                              borderWidth: 2,
                              py: 1.5,
                              px: 3,
                            }}
                          >
                            <CloudUploadIcon fontSize="large" />
                            <span style={{ [direction.marginLeft]: "6px" }}>
                              {t("choose-image") || "Choose Image"}
                            </span>
                          </Button>

                          <IconButton
                            color="primary"
                            onClick={handleFileUpload}
                            disabled={isSubmitting}
                            sx={{
                              border: "1px dashed",
                              borderColor: "primary.main",
                              "&:hover": {
                                backgroundColor: "primary.light",
                                color: "white",
                              },
                            }}
                          >
                            <PhotoCameraIcon fontSize="large" />
                          </IconButton>
                        </Stack>

                        {/* Error Message */}
                        {errors.image && touched.image && (
                          <Typography
                            color="error"
                            variant="caption"
                            sx={{ display: "block", mb: 1 }}
                          >
                            {errors.image}
                          </Typography>
                        )}

                        {/* Image Preview */}
                        {values.image && (
                          <Box sx={{ mt: 2 }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={URL.createObjectURL(values.image)}
                                sx={{ width: 60, height: 60 }}
                              >
                                <ImageIcon />
                              </Avatar>

                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" fontWeight="medium">
                                  {values.image.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {formatFileSize(values.image.size)}
                                </Typography>
                              </Box>

                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  setFieldValue("image", null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                                disabled={isSubmitting}
                              >
                                <DeleteIcon fontSize="medium" />
                              </IconButton>
                            </Stack>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    <div style={{ marginTop: "8px" }}>
                      <ButtonWrapper disabled={isSubmitting}>
                        {isSubmitting
                          ? t("adding-subject") || "Adding Subject..."
                          : t("add-subject") || "Add Subject"}
                      </ButtonWrapper>
                    </div>
                  </FormWrapper>
                </Form>
              </motion.div>
            )}
          </Formik>
        </ContainerFormWrapper>
      </div>
    </>
  );
}
