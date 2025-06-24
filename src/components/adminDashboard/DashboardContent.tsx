import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import {
  BarChart,
  Event,
  Schedule,
  People,
  Add,
  ArrowForward,
  FiberManualRecord,
} from "@mui/icons-material";
import { DashboardStats } from "./DashboardStats";

const recentActivities = [
  {
    id: 1,
    title: "New student enrollment",
    description: "John Doe enrolled in Advanced Mathematics",
    time: "2 minutes ago",
    type: "enrollment",
  },
  {
    id: 2,
    title: "Course completion",
    description: "Sarah Smith completed Physics 101",
    time: "15 minutes ago",
    type: "completion",
  },
  {
    id: 3,
    title: "Quiz submitted",
    description: "Mike Johnson submitted Chemistry Quiz #3",
    time: "1 hour ago",
    type: "quiz",
  },
  {
    id: 4,
    title: "New assignment",
    description: "Biology Assignment #5 has been created",
    time: "2 hours ago",
    type: "assignment",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "Today, 3:00 PM",
    attendees: 24,
  },
  {
    id: 2,
    title: "Science Fair",
    date: "Tomorrow, 9:00 AM",
    attendees: 156,
  },
  {
    id: 3,
    title: "Staff Training",
    date: "Friday, 2:00 PM",
    attendees: 12,
  },
];

export function DashboardContent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <DashboardStats />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Recent Activities */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Activities
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<ArrowForward />}
                  sx={{ textTransform: "none" }}
                >
                  View All
                </Button>
              </Box>

              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: "grey.50",
                        "&:hover": {
                          bgcolor: "grey.100",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 8,
                          height: 8,
                          bgcolor: "primary.main",
                        }}
                      >
                        <FiberManualRecord sx={{ fontSize: 8 }} />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {activity.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 0.5 }}
                            >
                              {activity.description}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <Schedule
                                sx={{ fontSize: 12, color: "text.disabled" }}
                              />
                              <Typography
                                variant="caption"
                                color="text.disabled"
                              >
                                {activity.time}
                              </Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && (
                      <Divider sx={{ my: 0.5 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Event color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Upcoming Events
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
              >
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "primary.50",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {event.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      <Schedule
                        sx={{ fontSize: 14, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <People sx={{ fontSize: 14, color: "text.disabled" }} />
                      <Typography variant="caption" color="text.disabled">
                        {event.attendees} attendees
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Button
                variant="contained"
                fullWidth
                startIcon={<Add />}
                sx={{
                  background: "linear-gradient(45deg, #1976d2, #7b1fa2)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Add Event
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Overview */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <BarChart color="success" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Performance Overview
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Course Completion
                  </Typography>
                  <Chip label="89%" color="primary" size="small" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={89}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Student Satisfaction
                  </Typography>
                  <Chip label="94%" color="success" size="small" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={94}
                  color="success"
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Assignment Submissions
                  </Typography>
                  <Chip label="76%" color="warning" size="small" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={76}
                  color="warning"
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
