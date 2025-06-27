import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { GameData } from "../../utils/types/general";
import UseMediaQuery from "../../hooks/use-media-query";
import UseDirection from "../../hooks/use-direction";

// Import the icons we need
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import { useAppSelector } from "../../hooks/redux";

interface Props {
  to: string;
  data: GameData;
}

function CardGame({ to, data }: Props) {
  const { t } = useTranslation();
  const { direction } = UseDirection();
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 600px)" });
  const [isHovered, setIsHovered] = React.useState(false);
  const { categoryGame } = useParams();

  // Map icon names to components
  const iconMap = {
    EmojiObjects: <EmojiObjectsIcon />,
    SportsFootball: <SportsFootballIcon />,
  };

  const iconComponent = iconMap[data.icon as keyof typeof iconMap] || (
    <EmojiObjectsIcon />
  );
  const { role } = useAppSelector((state) => state.auth);

  // Check if we should show two buttons - Admin acts as Teacher
  const showTwoButtons =
    categoryGame === "entertainment" &&
    (role === "Teacher" || role === "Student" || role === "Admin");

  // Generate the appropriate links - Admin acts as Teacher
  const getMakeLink = () => {
    if (role === "Teacher" || role === "Admin") {
      return categoryGame === "education"
        ? `${to}/education`
        : `${to}/entertainment`;
    } else if (role === "Student") {
      return categoryGame === "education" ? to : `/make-${to}/entertainment`;
    }
    return `/make-${to}/entertainment`;
  };

  const getPlayLink = () => {
    // Extract game name from the 'to' prop (e.g., "offside" from "/make-offside")
    const gameName = to.replace("/make-", "").replace("/", "");

    if (role === "Teacher" || role === "Admin") {
      return categoryGame === "education"
        ? `${to}/education`
        : `/games/${categoryGame}/${gameName}/play-${gameName}`;
    } else if (role === "Student") {
      return categoryGame === "education"
        ? to
        : `/games/${categoryGame}/${gameName}/play-${gameName}`;
    }
    return `/games/${categoryGame}/${gameName}/play-${gameName}`;
  };

  const getSingleButtonLink = () => {
    if (role === "Teacher" || role === "Admin") {
      return categoryGame === "education"
        ? `${to}/education`
        : `${to}/entertainment`;
    } else if (role === "Student") {
      return categoryGame === "education" ? to : `${to}/play-${to}`;
    }
    // For roles that are neither Student nor Teacher nor Admin
    return localStorage.getItem("gameState") === "play"
      ? `${to}/play-${to}`
      : `/make-${to}/entertainment`;
  };

  if (showTwoButtons) {
    // Render card without Link wrapper when showing two buttons
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isHovered ? "translateY(-12px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `${data.color}15`,
            height: isSmallScreen ? 180 : 220,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at center, ${data.color}30 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0.5,
              transition: "opacity 0.4s ease",
            }}
          />
          {React.cloneElement(iconComponent as React.ReactElement, {
            sx: {
              fontSize: isSmallScreen ? 100 : 140,
              color: data.color,
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.4s ease",
            },
          })}
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            p: isSmallScreen ? 2 : 3,
            pb: isSmallScreen ? 12 : 14, // Increased padding for two buttons
            position: "relative",
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            component="h2"
            gutterBottom
            sx={{
              textAlign: direction.direction === "rtl" ? "right" : "left",
              fontWeight: "bold",
              color: isHovered ? data.color : "text.primary",
              transition: "color 0.3s ease",
            }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              textAlign: direction.direction === "rtl" ? "right" : "left",
              color: "text.secondary",
            }}
          >
            {data.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            position: "absolute",
            bottom: isSmallScreen ? 12 : 20,
            left: isSmallScreen ? "50%" : 24,
            right: isSmallScreen ? "auto" : 24,
            transform: isSmallScreen ? "translateX(-50%)" : "none",
            width: isSmallScreen ? "auto" : "calc(100% - 48px)",
            px: 0,
            display: "flex",
            gap: 1,
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <Button
            component={Link}
            to={getMakeLink()}
            size="large"
            variant="contained"
            sx={{
              backgroundColor: data.color,
              fontWeight: "bold",
              px: isSmallScreen ? 3 : 2,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              flex: 1,
              boxShadow: isHovered
                ? `0 10px 15px -3px ${data.color}40, 0 4px 6px -2px ${data.color}30`
                : `0 4px 6px -1px ${data.color}30, 0 2px 4px -1px ${data.color}20`,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: data.color,
                boxShadow: `0 20px 25px -5px ${data.color}40, 0 10px 10px -5px ${data.color}30`,
              },
            }}
          >
            {t("create-question-now")}
          </Button>
          <Button
            component={Link}
            to={getPlayLink()}
            size="large"
            variant="outlined"
            sx={{
              borderColor: data.color,
              color: data.color,
              fontWeight: "bold",
              px: isSmallScreen ? 3 : 2,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              flex: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: data.color,
                backgroundColor: `${data.color}10`,
              },
            }}
          >
            {t("start-playing")}
          </Button>
        </CardActions>
      </Card>
    );
  }

  // Original single button card with Link wrapper
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: isHovered ? "translateY(-12px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      component={Link}
      to={getSingleButtonLink()}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${data.color}15`,
          height: isSmallScreen ? 180 : 220,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at center, ${data.color}30 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.5,
            transition: "opacity 0.4s ease",
          }}
        />
        {React.cloneElement(iconComponent as React.ReactElement, {
          sx: {
            fontSize: isSmallScreen ? 100 : 140,
            color: data.color,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.4s ease",
          },
        })}
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          p: isSmallScreen ? 2 : 3,
          pb: isSmallScreen ? 8 : 10,
          position: "relative",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          component="h2"
          gutterBottom
          sx={{
            textAlign: direction.direction === "rtl" ? "right" : "left",
            fontWeight: "bold",
            color: isHovered ? data.color : "text.primary",
            transition: "color 0.3s ease",
          }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            textAlign: direction.direction === "rtl" ? "right" : "left",
            color: "text.secondary",
          }}
        >
          {data.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: isSmallScreen ? 12 : 20,
          left:
            direction.direction === "rtl" ? "auto" : isSmallScreen ? "50%" : 24,
          right:
            direction.direction === "rtl"
              ? isSmallScreen
                ? "50%"
                : 24
              : "auto",
          transform: isSmallScreen ? "translateX(-50%)" : "none",
          width: isSmallScreen ? "auto" : "calc(100% - 48px)",
          px: 0,
          textAlign: "center",
        }}
      >
        <Button
          size="large"
          variant="contained"
          sx={{
            backgroundColor: data.color,
            fontWeight: "bold",
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: isHovered
              ? `0 10px 15px -3px ${data.color}40, 0 4px 6px -2px ${data.color}30`
              : `0 4px 6px -1px ${data.color}30, 0 2px 4px -1px ${data.color}20`,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: data.color,
              boxShadow: `0 20px 25px -5px ${data.color}40, 0 10px 10px -5px ${data.color}30`,
            },
          }}
        >
          {role === "Teacher" ||
          role === "Admin" ||
          localStorage.getItem("gameState") === "make"
            ? t("create-question-now")
            : t("start-playing")}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardGame;
