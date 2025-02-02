import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import IntroductorySection from "../../components/introductory";
import UseMediaQuery from "../../hooks/use-media-query";
import UseDirection from "../../hooks/use-direction";
import { LinkPlay } from "../../styles/games/five-hints";

function HomePage() {
  const [number, setNumber] = useState<number>(0);
  const isBigScreen = UseMediaQuery({ query: "(min-width: 700px)" });
  const { t } = useTranslation();
  const { direction } = UseDirection();

  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1000);
  }, [number]);
  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }} // Initial state (page fully visible)
      animate={{ opacity: 1, x: 0 }} // No change while on the page
      exit={{ opacity: 0, x: -50 }} // Fades and moves left when leaving
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "relative",
        minHeight: isBigScreen ? "calc(100vh - 166px)" : "100vh",
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          minWidth: 275,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <IntroductorySection />
        <LinkPlay to="get-questions" dir={direction.direction}>
          {t("play-now")}
          {direction.direction === "ltr" ? (
            <ArrowForwardIcon />
          ) : (
            <ArrowBackIcon />
          )}
        </LinkPlay>
      </Box>
    </motion.div>
  );
}

export default HomePage;
