import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GameData } from "../../utils/types/general";
import UseMediaQuery from "../../hooks/use-media-query";

interface Props {
  to: string;
  data: GameData;
}

function CardGame({ to, data }: Props) {
  const { t } = useTranslation();
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 898px)" });

  return (
    <Card sx={{ minWidth: 275, minHeight: 350, position: "relative" }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {data.title}
        </Typography>
        <Typography variant="h6">{data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          component={Link}
          to={`/get-questions/${to}`}
          style={{
            display: "flex",
            position: "absolute",
            bottom: "8px",
            left: isSmallScreen ? "50%" : "inherit",
            transform: isSmallScreen ? "translateX(-50%)" : "inherit",
          }}
        >
          {t("start-playing")}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardGame;
