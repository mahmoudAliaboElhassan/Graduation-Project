import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  People,
  Book,
  EmojiEvents,
} from "@mui/icons-material";

const stats = [
  {
    title: "Total Students",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: People,
    color: "#1976d2",
  },
  {
    title: "Active Courses",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: Book,
    color: "#2e7d32",
  },
  {
    title: "Completion Rate",
    value: "89.2%",
    change: "-2.1%",
    trend: "down",
    icon: EmojiEvents,
    color: "#7b1fa2",
  },
  {
    title: "Monthly Activity",
    value: "94.7%",
    change: "+5.4%",
    trend: "up",
    icon: "Activity",
    color: "#f57c00",
  },
];

export function DashboardStats() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                  borderRadius: "0 0 0 100%",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {stat.title}
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </Box>
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
                >
                  {stat.value}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TrendIcon
                    sx={{
                      fontSize: 16,
                      color: stat.trend === "up" ? "#2e7d32" : "#d32f2f",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: stat.trend === "up" ? "#2e7d32" : "#d32f2f",
                    }}
                  >
                    {stat.change}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
