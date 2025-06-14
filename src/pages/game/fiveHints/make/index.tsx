import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MultiStepQuestionModal from "../../../../components/formUI/fiveHintsMaking";

export default function MakeHintsQuestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation("translation");

  return (
    <Box
      sx={{
        py: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t("questionCreation.pageTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          {t("questionCreation.pageDescription")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          {t("questionCreation.buttons.openModal")}
        </Button>
      </Box>

      <MultiStepQuestionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
