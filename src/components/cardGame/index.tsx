import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 600px)" });

  return (
    <Card sx={{ minWidth: 275, minHeight: 650, position: "relative" }}>
      <CardMedia
        component="img"
        height={300}
        image={data.image}
        title={data.title}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "300px",
        }}
      />
      <CardContent>
        <Typography variant={isSmallScreen ? "h5" : "h4"} component="div">
          {data.title}
        </Typography>
        <Typography variant={"h6"} sx={{ mb: 5 }}>
          {data.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          position: "absolute",
          bottom: "8px",
          left: isSmallScreen ? "50%" : "inherit",
          transform: isSmallScreen ? "translateX(-50%)" : "inherit",
        }}
      >
        <Button
          size="small"
          variant="contained"
          component={Link}
          to={`/get-questions/${to}`}
        >
          {t("start-playing")}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardGame;
