import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom"; // 👈 import this
import CardGame from "../../components/cardGame";
import { HeadingElement } from "../../styles/heading";
import UseGamesData from "../../hooks/use-game-data";
import { useAppSelector } from "../../hooks/redux";
import withGuard from "../../utils/withGuard";

function Games() {
  const { t } = useTranslation();
  const { gamesData } = UseGamesData();
  const { role } = useAppSelector((state) => state.auth);
  return (
    <Container
      maxWidth="md"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid spacing={4} container>
        <Grid size={{ xs: 12 }}>
          <HeadingElement>
            {role == "Teacher" || role == "Admin"
              ? t("select-game-create")
              : t("select-game-play")}
          </HeadingElement>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <CardGame
            to={
              role === "Teacher" || role == "Admin"
                ? "/make-five-hints"
                : "five-hints"
            }
            data={gamesData[0]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <CardGame
            to={
              role === "Teacher" || role == "Admin"
                ? "/make-offside"
                : "offside"
            }
            data={gamesData[1]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <CardGame
            to={
              role == "Teacher" || role == "Admin"
                ? "/make-difficulty"
                : "difficulty"
            }
            data={gamesData[2]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withGuard(Games);
