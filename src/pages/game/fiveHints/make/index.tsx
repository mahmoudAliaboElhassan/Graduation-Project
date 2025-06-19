import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MultiStepQuestionModal from "../../../../components/formUI/fiveHintsMaking";
import withGuard from "../../../../utils/withGuard";
import { useParams } from "react-router-dom";
import MultipleStepEntertainment from "../../../../components/formUI/fiveHintsMaking/MultipleStepEntertainment";

function MakeHintsQuestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation("translation");
  const { category } = useParams();

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
      {category === "education" ? (
        <MultiStepQuestionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <MultipleStepEntertainment
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
}
export default withGuard(MakeHintsQuestion);
