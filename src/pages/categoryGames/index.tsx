import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TheatersIcon from "@mui/icons-material/Theaters";
import SchoolIcon from "@mui/icons-material/School";
import UseDirection from "../../hooks/use-direction";
import UseGamesCategories from "../../hooks/use-games-catories";
import { HeadingElement } from "../../styles/heading";
import UseQuestionCategories from "../../hooks/use-game-categories-make";
import { useAppSelector } from "../../hooks/redux";
import withGuard from "../../utils/withGuard";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  state: string | undefined;
}

export const CategoryCard = ({
  title,
  description,
  icon,
  color,
  route,
  state,
}: CategoryCardProps) => {
  const { direction } = UseDirection();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Map icon names to components
  const iconMap = {
    Theaters: <TheatersIcon />,
    School: <SchoolIcon />,
  };

  const iconComponent = iconMap[icon as keyof typeof iconMap] || <SchoolIcon />;
  const { mymode } = useAppSelector((state) => state.mode);
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        onClick={() => {
          if (state) {
            localStorage.setItem("gameState", state);
          }
        }}
        to={route}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          {React.cloneElement(iconComponent as React.ReactElement, {
            sx: {
              fontSize: isSmallScreen ? 40 : 50,
              color: color,
            },
          })}
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: direction.direction === "rtl" ? "right" : "left",
            width: "100%",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: mymode === "dark" ? "white" : "black",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CategoriesPage = () => {
  const { direction } = UseDirection();
  const { t } = useTranslation();
  const { categories } = UseGamesCategories();
  const { categoryQuestionMaking } = UseQuestionCategories();
  const { role } = useAppSelector((state) => state.auth);
  let categoryRole;
  categoryRole = role === "Teacher" ? categoryQuestionMaking : categories;
  if (role !== "Teacher" && role !== "Student") {
    categoryRole = [categoryQuestionMaking[0], categories[0]];
  }
  console.log("catergoryRole", categoryRole);
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          direction: direction.direction,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <HeadingElement> {t("categories.pageTitle")}</HeadingElement>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {categoryRole.map(
            ({ title, description, icon, color, route, state }) => (
              <Grid item xs={12} sm={5} key={route}>
                <CategoryCard
                  title={title}
                  description={description}
                  icon={icon}
                  color={color}
                  route={route}
                  state={state}
                />
              </Grid>
            )
          )}
        </Grid>
        <Outlet />
      </Box>
    </div>
  );
};

export default withGuard(CategoriesPage);
