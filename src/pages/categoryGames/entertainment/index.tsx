import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import PaletteIcon from "@mui/icons-material/Palette";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTranslation } from "react-i18next";
import UseDirection from "../../../hooks/use-direction";
import UseCategoryEntertainment from "../../../hooks/use-category-entertainment";
import { HeadingElement } from "../../../styles/heading";
import { Link } from "react-router-dom";

const CategoryEntertainmentCard: React.FC<{
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  route: string;
}> = ({ id, title, description, iconName, color, route }) => {
  const { direction } = UseDirection();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Map icon names to components
  const iconMap = {
    MusicNote: <MusicNoteIcon />,
    Movie: <MovieIcon />,
    Palette: <PaletteIcon />,
    MenuBook: <MenuBookIcon />,
    EmojiEvents: <EmojiEventsIcon />,
  };

  const icon = iconMap[iconName as keyof typeof iconMap] || <MenuBookIcon />;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
        },
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardActionArea
        component={Link}
        to="/games/entertainment"
        onClick={() => localStorage.setItem("entertainmentGameId", id)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: `${color}20`, // 20% opacity version of the color
            borderRadius: "50%",
            width: isSmallScreen ? 80 : 100,
            height: isSmallScreen ? 80 : 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          {React.cloneElement(icon as React.ReactElement, {
            sx: {
              fontSize: isSmallScreen ? 40 : 50,
              color: color,
            },
          })}
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: "center",
            width: "100%",
            p: isSmallScreen ? 1 : 2,
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: { xs: "none", sm: "block" },
              textAlign: direction.direction === "rtl" ? "right" : "left",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CategoryEntertainment: React.FC = () => {
  const { direction } = UseDirection();
  const theme = useTheme();
  const { t } = useTranslation();
  const { categoriesEntertainment } = UseCategoryEntertainment();

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        minHeight: "100vh",
        direction: direction.direction,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <HeadingElement>{t("categories.pageTitle")}</HeadingElement>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {categoriesEntertainment.map((category) => (
            <Grid item xs={4} sm={4} md={4} key={category.id}>
              <CategoryEntertainmentCard
                id={category.id}
                title={category.title}
                description={category.description}
                iconName={category.icon}
                color={category.color}
                route={category.route}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryEntertainment;
