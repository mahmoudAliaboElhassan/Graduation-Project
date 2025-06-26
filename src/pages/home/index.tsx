import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import IntroductorySection from "../../components/introductory";
import UseMediaQuery from "../../hooks/use-media-query";
import UseDirection from "../../hooks/use-direction";
import { LinkPlay } from "../../styles/games/five-hints";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

function HomePage() {
  const isBigScreen = UseMediaQuery({ query: "(min-width: 700px)" });
  const { t } = useTranslation();
  const { token, role, name, totalPoints } = useAppSelector(
    (state) => state.auth
  );
  const { direction } = UseDirection();
  const dispatch = useAppDispatch();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Get role-specific content
  const getRoleContent = () => {
    switch (role) {
      case "Admin":
        return {
          title: t("admin.dashboard.title"),
          icon: <AdminPanelSettingsIcon sx={{ fontSize: 28 }} />,
          path: "admin",
          color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          description: t("roleDescription.admin"),
        };
      case "Teacher":
        return {
          title: t("questionCreation.title"),
          icon: <QuizIcon sx={{ fontSize: 28 }} />,
          path: "games",
          color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          description: t("roleDescription.teacher"),
        };
      case "Student":
        return {
          title: t("play-now"),
          icon: <PlayArrowIcon sx={{ fontSize: 28 }} />,
          path: "games",
          color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          description: t("roleDescription.student"),
        };
      default:
        return {
          title: t("explore-games"),
          icon: <SchoolIcon sx={{ fontSize: 28 }} />,
          path: "games",
          color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
          description: t("roleDescription.default"),
        };
    }
  };

  const roleContent = getRoleContent();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -50 }}
      variants={containerVariants}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          zIndex: 0,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <motion.div variants={itemVariants}>
          <IntroductorySection />
        </motion.div>

        {token && (
          <motion.div
            variants={itemVariants}
            style={{ width: "100%", maxWidth: "600px", marginTop: "3rem" }}
          >
            {/* User Info Card */}
            <Card
              sx={{
                mb: 4,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  mb={2}
                >
                  {name && (
                    <Chip
                      label={`${t("welcome-now")}, ${name}!`}
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                        py: 2,
                        px: 1,
                      }}
                    />
                  )}
                  {totalPoints !== undefined && (
                    <Chip
                      label={`${totalPoints} Points`}
                      sx={{
                        background: "linear-gradient(45deg, #FFD700, #FFA500)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1rem",
                        py: 2,
                        px: 1,
                        boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                      }}
                    />
                  )}
                </Stack>

                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 300,
                  }}
                >
                  {roleContent.description}
                </Typography>
              </CardContent>
            </Card>

            {/* Main Action Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Paper
                component={Link}
                to={roleContent.path}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  p: 4,
                  background: roleContent.color,
                  color: "white",
                  textDecoration: "none",
                  borderRadius: 4,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  },
                }}
              >
                {roleContent.icon}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {roleContent.title}
                </Typography>
                {direction.direction === "ltr" ? (
                  <ArrowForwardIcon sx={{ fontSize: 28 }} />
                ) : (
                  <ArrowBackIcon sx={{ fontSize: 28 }} />
                )}
              </Paper>
            </motion.div>

            {/* Additional Quick Actions for different roles */}
            {role === "Student" && (
              <motion.div variants={itemVariants} style={{ marginTop: "2rem" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: "center", py: 2 }}>
                        <QuizIcon
                          sx={{ fontSize: 32, color: "white", mb: 1 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          Quick Quiz
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: "center", py: 2 }}>
                        <SchoolIcon
                          sx={{ fontSize: 32, color: "white", mb: 1 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          Leaderboard
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* For non-authenticated users */}
        {!token && (
          <motion.div
            variants={itemVariants}
            style={{ marginTop: "3rem", width: "100%", maxWidth: "400px" }}
          >
            <Stack spacing={2}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
                  color: "white",
                  py: 2,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(255, 107, 107, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FF5252, #FF7043)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 35px rgba(255, 107, 107, 0.4)",
                  },
                }}
              >
                {t("get-started")}
                <ArrowForwardIcon sx={{ ml: 1 }} />
              </Button>

              <Button
                component={Link}
                to="/signup"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  color: "white",
                  py: 2,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    background: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
}

export default HomePage;
