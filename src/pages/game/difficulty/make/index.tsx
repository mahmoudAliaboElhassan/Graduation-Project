import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import withGuard from "../../../../utils/withGuard";
import { useParams } from "react-router-dom";
import MultipleStepEntertainment from "../../../../components/formUI/fiveHintsMaking/MultipleStepEntertainment";
import MultipleStepDifficultyMoadal from "../../../../components/formUI/difficultyModal";
import MultipleStepEntertainmentDifficulty from "../../../../components/formUI/difficultyModal/MultipleStepEntertainmentDifficulty";

function MakeDifficulty() {
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
          {t("difficulty.pageTitle")}
        </Typography>
        <Typography variant="body1" mb={4}>
          {t("difficulty.pageDescription")}
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
        <MultipleStepDifficultyMoadal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <MultipleStepEntertainmentDifficulty
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
}
export default withGuard(MakeDifficulty);
