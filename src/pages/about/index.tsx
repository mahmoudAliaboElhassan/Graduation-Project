import type React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  Stack,
  Avatar,
  Box,
} from "@mui/material";
import {
  MenuBook,
  People,
  SportsEsports,
  AddCircle,
  EmojiEvents,
  AutoAwesome,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/redux";
import UseMediaQuery from "../../hooks/use-media-query";
import UseDirection from "../../hooks/use-direction";

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  cardBg: string;
  cardHover: string;
  textPrimary: string;
  textSecondary: string;
  chipBg: string;
  paperBg: string;
}

interface MissionItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}
const scrollToMission = () => {
  const missionSection = document.getElementById("mission-section");
  missionSection?.scrollIntoView({ behavior: "smooth" });
};
const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mymode } = useAppSelector((state: any) => state.mode);
  const isRTL: boolean = i18n.language === "ar";
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 898px)" });
  const { token } = useAppSelector((state) => state.auth);
  // Theme-aware colors
  const colors: Colors = {
    primary: mymode === "light" ? "#ec4899" : "#f472b6",
    secondary: mymode === "light" ? "#f8bbd9" : "#fbbf24",
    accent: mymode === "light" ? "#c084fc" : "#a78bfa",
    cardBg:
      mymode === "light" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.1)",
    cardHover:
      mymode === "light" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.15)",
    textPrimary: mymode === "light" ? "#374151" : "#f3f4f6",
    textSecondary: mymode === "light" ? "#6b7280" : "#d1d5db",
    chipBg:
      mymode === "light" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
    paperBg:
      mymode === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
        : "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
  };

  const studentFeatures: string[] = t("studentFeatures", {
    returnObjects: true,
  }) as string[];
  const teacherFeatures: string[] = t("teacherFeatures", {
    returnObjects: true,
  }) as string[];
  const everyoneFeatures: string[] = t("everyoneFeatures", {
    returnObjects: true,
  }) as string[];

  const missionItems: MissionItem[] = [
    {
      icon: "🎯",
      title: t("vision"),
      description: t("visionDesc"),
      color: colors.secondary,
    },
    {
      icon: "💡",
      title: t("innovation"),
      description: t("innovationDesc"),
      color: colors.accent,
    },
    {
      icon: "🤝",
      title: t("community"),
      description: t("communityDesc"),
      color: mymode === "light" ? "#fca5a5" : "#f87171",
    },
  ];
  const { direction } = UseDirection();
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          direction: isRTL ? "rtl" : "ltr",
          // Removed backgroundImage - will inherit from root layout
        }}
      >
        <Grid item xs={12}>
          {/* Hero Section */}
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 8, md: 12 },
              mb: 6,
            }}
          >
            <Chip
              label={t("graduationProject")}
              sx={{
                mb: 3,
                backgroundColor: colors.chipBg,
                color: "white",
                border: `1px solid ${colors.chipBg}`,
                "&:hover": {
                  backgroundColor:
                    mymode === "light"
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(255,255,255,0.2)",
                },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
                fontWeight: "bold",
                mb: 3,
                letterSpacing: "-0.02em",
                color: "white",
              }}
            >
              {i18n.language === "en" ? (
                <>
                  Edu
                  <Box component="span" sx={{ color: colors.secondary }}>
                    Play
                  </Box>
                </>
              ) : (
                <Box component="span" sx={{ color: colors.secondary }}>
                  {t("title")}
                </Box>
              )}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
                color: colors.secondary,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              {t("subtitle")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4, gap: "8px" }}
            >
              <Button
                component={Link}
                to="/games/"
                variant="contained"
                size="large"
                startIcon={<SportsEsports />}
                sx={{
                  backgroundColor: colors.primary,
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "& .MuiButton-startIcon": {
                    [direction.marginRight]: "6px", // or any value you prefer
                  },
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: mymode === "light" ? "#f472b6" : "#ec4899",
                  },
                }}
              >
                {t("startPlaying")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={scrollToMission}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "& .MuiButton-startIcon": {
                    [direction.marginRight]: "6px", // or any value you prefer
                  },
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: mymode === "light" ? "#7c2d92" : "#1a1a2e",
                    borderColor: "white",
                  },
                }}
              >
                {t("learnMore")}
              </Button>
            </Stack>
          </Box>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                  mb: 2,
                  color: "white",
                }}
              >
                {t("threeWorlds")}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: "900px",
                  mx: "auto",
                  color: colors.secondary,
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                {t("threeWorldsDesc")}
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* For Students */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: colors.cardBg,
                    backdropFilter: "blur(10px)",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: colors.secondary,
                      transform: "translateY(-4px)",
                      boxShadow:
                        mymode === "light"
                          ? "0 20px 40px rgba(0,0,0,0.1)"
                          : "0 20px 40px rgba(255,255,255,0.1)",
                      backgroundColor: colors.cardHover,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        backgroundColor:
                          mymode === "light"
                            ? "#fee2e2"
                            : "rgba(220, 38, 38, 0.2)",
                        color: "#dc2626",
                      }}
                    >
                      <MenuBook sx={{ fontSize: 40 }} />
                    </Avatar>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#dc2626",
                        fontWeight: "bold",
                        mb: 1,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      {t("forStudents")}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.textSecondary,
                        mb: 3,
                      }}
                    >
                      {t("forStudentsDesc")}
                    </Typography>

                    <Stack
                      spacing={2}
                      sx={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      {studentFeatures?.map((item: string, index: number) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <EmojiEvents
                            sx={{
                              color: colors.primary,
                              mr: isRTL ? 0 : 2,
                              ml: isRTL ? 2 : 0,
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: colors.textPrimary }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* For Teachers */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: colors.cardBg,
                    backdropFilter: "blur(10px)",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: colors.accent,
                      transform: "translateY(-4px)",
                      boxShadow:
                        mymode === "light"
                          ? "0 20px 40px rgba(0,0,0,0.1)"
                          : "0 20px 40px rgba(255,255,255,0.1)",
                      backgroundColor: colors.cardHover,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        backgroundColor:
                          mymode === "light"
                            ? "#ede9fe"
                            : "rgba(124, 58, 237, 0.2)",
                        color: "#7c3aed",
                      }}
                    >
                      <AddCircle sx={{ fontSize: 40 }} />
                    </Avatar>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#7c3aed",
                        fontWeight: "bold",
                        mb: 1,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      {t("forTeachers")}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.textSecondary,
                        mb: 3,
                      }}
                    >
                      {t("forTeachersDesc")}
                    </Typography>

                    <Stack
                      spacing={2}
                      sx={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      {teacherFeatures?.map((item: string, index: number) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <People
                            sx={{
                              color: "#7c3aed",
                              mr: isRTL ? 0 : 2,
                              ml: isRTL ? 2 : 0,
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: colors.textPrimary }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* For Everyone */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: colors.cardBg,
                    backdropFilter: "blur(10px)",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: colors.secondary,
                      transform: "translateY(-4px)",
                      boxShadow:
                        mymode === "light"
                          ? "0 20px 40px rgba(0,0,0,0.1)"
                          : "0 20px 40px rgba(255,255,255,0.1)",
                      backgroundColor: colors.cardHover,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        backgroundColor:
                          mymode === "light"
                            ? "#fce7f3"
                            : "rgba(236, 72, 153, 0.2)",
                        color: colors.primary,
                      }}
                    >
                      <AutoAwesome sx={{ fontSize: 40 }} />
                    </Avatar>

                    <Typography
                      variant="h4"
                      sx={{
                        color: colors.primary,
                        fontWeight: "bold",
                        mb: 1,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      {t("forEveryone")}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.textSecondary,
                        mb: 3,
                      }}
                    >
                      {t("forEveryoneDesc")}
                    </Typography>

                    <Stack
                      spacing={2}
                      sx={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      {everyoneFeatures?.map((item: string, index: number) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <SportsEsports
                            sx={{
                              color: "#dc2626",
                              mr: isRTL ? 0 : 2,
                              ml: isRTL ? 2 : 0,
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: colors.textPrimary }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Mission Section */}
          <Paper
            id="mission-section"
            sx={{
              background: colors.paperBg,
              backdropFilter: "blur(10px)",
              py: 6,
              px: 4,
              mb: 6,
              borderRadius: 2,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} lg={6}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    color: "white",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  {t("ourMission")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: colors.secondary,
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  {t("missionText1")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: colors.secondary,
                    lineHeight: 1.6,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  {t("missionText2")}
                </Typography>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Stack spacing={3}>
                  {missionItems?.map((item: MissionItem, index: number) => (
                    <Paper
                      key={index}
                      sx={{
                        background:
                          mymode === "light"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          mymode === "light"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(255,255,255,0.1)"
                        }`,
                        p: 3,
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: item.color,
                          fontWeight: "bold",
                          mb: 1,
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                        }}
                      >
                        {item.icon} {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color:
                            mymode === "light"
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.8)",
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              px: 4,
              background:
                mymode === "light"
                  ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)"
                  : "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "white",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              {t("readyToTransform")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.secondary,
                mb: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              {t("joinThousands")}
            </Typography>
            {!token && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                sx={{ gap: "8px" }}
              >
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  startIcon={<MenuBook />}
                  sx={{
                    backgroundColor: colors.primary,
                    color: "white",
                    px: 4,
                    py: 1.5,
                    "& .MuiButton-startIcon": {
                      [direction.marginRight]: "6px", // or any value you prefer
                    },
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor:
                        mymode === "light" ? "#f472b6" : "#ec4899",
                    },
                  }}
                >
                  {t("getStartedStudent")}
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  size="large"
                  startIcon={<AddCircle />}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    "& .MuiButton-startIcon": {
                      [direction.marginRight]: "6px", // or any value you prefer
                    },
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor: "white",
                      color:
                        mymode === "light"
                          ? "#7c2d92 !important"
                          : "#1a1a2e !important",
                      borderColor: "white",
                    },
                  }}
                >
                  {t("joinAsTeacher")}
                </Button>
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
