import React from "react";

import { useTranslation } from "react-i18next";
import { Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CardGame from "../../components/cardGame";
import { HeadingElement } from "../../styles/heading";
import UseGamesData from "../../hooks/use-game-data";

function Games() {
  const { t } = useTranslation();
  const { gamesData } = UseGamesData();
  console.log("gamesDatagamesData", gamesData);

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
        {" "}
        <Grid size={{ xs: 12 }}>
          <HeadingElement>{t("select-game")}</HeadingElement>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardGame to="five-hints" data={gamesData[0]} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardGame to="offside" data={gamesData[1]} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Games;
