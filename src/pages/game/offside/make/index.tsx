import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MultiStepOffsideModal from "../../../../components/formUI/offsideModal";
import withGuard from "../../../../utils/withGuard";

function MakeOffsideQuestion() {
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
          {t("offsideCreation.pageTitle") || "Create Offside Question"}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          {t("offsideCreation.pageDescription") || "Create engaging offside questions with 6 pieces of information and mark which ones are correct."}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          {t("offsideCreation.buttons.openModal") || "Start Creating"}
        </Button>
      </Box>

      <MultiStepOffsideModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}

export default withGuard(MakeOffsideQuestion);

 