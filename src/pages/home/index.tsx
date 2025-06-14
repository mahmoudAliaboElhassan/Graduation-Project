import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import Test from "../../components/test";
import IntroductorySection from "../../components/introductory";
import UseMediaQuery from "../../hooks/use-media-query";
import UseDirection from "../../hooks/use-direction";
import { LinkPlay } from "../../styles/games/five-hints";
import { useAppSelector } from "../../hooks/redux";
import WithoutDelegation from "../../components/nodeletation";
import WithDelegation from "../../components/delegation";
import CategoriesPage from "../categoryGames";

function HomePage() {
  const [number, setNumber] = useState<number>(0);
  const isBigScreen = UseMediaQuery({ query: "(min-width: 700px)" });
  const { t } = useTranslation();
  const { token, role } = useAppSelector((state) => state.auth);

  const { direction } = UseDirection();

  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1000);
  }, [number]);
  return (
    <>
      <motion.div
        initial={{ opacity: 1, x: 0 }} // Initial state (page fully visible)
        animate={{ opacity: 1, x: 0 }} // No change while on the page
        exit={{ opacity: 0, x: -50 }} // Fades and moves left when leaving
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: "3rem",
        }}
      >
        {/* <Test/> */}
        {/* <WithDelegation /> */}
        <Box
          sx={{
            maxWidth: isBigScreen ? "700px" : "600px",
          }}
        >
          <IntroductorySection />
          {token && (
            <LinkPlay
              to={role === "Admin" ? "admin-dashboard" : "games"}
              dir={direction.direction}
            >
              {role === "Teacher"
                ? t("questionCreation.title")
                : role === "Admin"
                ? t("admin.dashboard.title")
                : t("play-now")}
              {direction.direction === "ltr" ? (
                <ArrowForwardIcon fontSize="large" />
              ) : (
                <ArrowBackIcon fontSize="large" />
              )}
            </LinkPlay>
          )}
        </Box>
      </motion.div>
    </>
  );
}

export default HomePage;
