import React, { useEffect } from "react"
import {
  Typography,
  Container,
  Grid,
  Paper,
  Fade,
  Zoom,
  Stack,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material"
import {
  LocalFireDepartment as FireIcon,
  People as UsersIcon,
  MyLocation as TargetIcon,
} from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { getTopTen } from "../../state/act/actAuth"
import { useTranslation } from "react-i18next"
import { HeaderCard, MainContainer, pulse } from "../../styles/top10"
import { LoadingComponent } from "../../components/loader/skelton"
import { TopPlayerCardComponent } from "../../components/top10/top3"
import { PlayerRowComponent } from "../../components/top10/playerRow"
import { formatPoints } from "../../utils/helperMethods"

const Top10LeaderboardPage: React.FC = () => {
  const { t } = useTranslation()
  const { topTen, loadingGetTopTen } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const theme = useTheme()

  useEffect(() => {
    dispatch(getTopTen())
  }, [dispatch])

  // Type-safe helper functions
  const isCurrentUser = (index: number): boolean => {
    return topTen?.me - 1 === index
  }

  const hasData = Boolean(topTen?.data && topTen.data.length > 0)
  const topThree = hasData ? topTen!.data.slice(0, 3) : []
  const remainingPlayers = hasData ? topTen!.data.slice(3) : []

  if (loadingGetTopTen) {
    return (
      <MainContainer>
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 3,
          }}
        />
        <LoadingComponent />
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <HeaderCard elevation={0}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <FireIcon
                sx={{
                  fontSize: 48,
                  color: "#FF6B35",
                  animation: `${pulse} 2s infinite`,
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  background:
                    "linear-gradient(45deg, #FFD700, #FF6B35, #FF0000)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "3rem", md: "4rem" },
                }}
              >
                {t("top10.title")}
              </Typography>
              <FireIcon
                sx={{
                  fontSize: 48,
                  color: "#FF6B35",
                  animation: `${pulse} 2s infinite`,
                }}
              />
            </Stack>
            <Typography
              variant="h6"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                fontWeight: 500,
              }}
            >
              {t("top10.subtitle")}
            </Typography>
          </HeaderCard>
        </Fade>

        {!hasData ? (
          <Fade in timeout={1000}>
            <Paper
              sx={{
                p: 8,
                textAlign: "center",
                background: alpha(theme.palette.common.white, 0.1),
                backdropFilter: "blur(10px)",
                borderRadius: 3,
              }}
            >
              <UsersIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
              <Typography variant="h5" sx={{ color: "common.white" }}>
                {t("top10.noData")}
              </Typography>
            </Paper>
          </Fade>
        ) : (
          <>
            {topThree.length > 0 && (
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {topThree.map((player, idx) => (
                  <Grid item xs={12} md={4} key={`top-${idx}`}>
                    <TopPlayerCardComponent
                      player={player}
                      rank={idx + 1}
                      isCurrentUser={isCurrentUser(idx)}
                      delay={idx}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {remainingPlayers.length > 0 && (
              <Fade in timeout={1200}>
                <Paper
                  sx={{
                    background: alpha(theme.palette.common.white, 0.1),
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${alpha(
                      theme.palette.common.white,
                      0.2
                    )}`,
                    borderRadius: 3,
                    p: 4,
                    mb: 4,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    <UsersIcon sx={{ fontSize: 32, color: "primary.main" }} />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "common.white" }}
                    >
                      {t("top10.remainingLeaders")}
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {remainingPlayers.map((player, idx) => {
                      const actualIndex = idx + 3
                      return (
                        <PlayerRowComponent
                          player={player}
                          rank={actualIndex + 1}
                          isCurrentUser={isCurrentUser(actualIndex)}
                          delay={idx}
                          key={`player-${actualIndex}`}
                        />
                      )
                    })}
                  </Stack>
                </Paper>
              </Fade>
            )}

            {topTen?.me !== undefined &&
              topTen.me >= 0 &&
              topTen.me < 10 &&
              topTen.data[topTen.me] && (
                <Zoom in timeout={1500}>
                  <Paper
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      color: "white",
                      p: 4,
                      textAlign: "center",
                      borderRadius: 3,
                      boxShadow: `0 16px 32px ${alpha(
                        theme.palette.common.black,
                        0.3
                      )}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                      sx={{ mb: 2 }}
                    >
                      <TargetIcon sx={{ fontSize: 32 }} />
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {t("top10.yourPosition")}
                      </Typography>
                    </Stack>
                    <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                      #{topTen.me}
                    </Typography>
                    <Typography variant="h6">
                      {topTen.data[topTen.me - 1].name} •{" "}
                      {formatPoints(topTen.data[topTen.me - 1].totalPoints)}{" "}
                      {t("top10.points")}
                    </Typography>
                  </Paper>
                </Zoom>
              )}
          </>
        )}
      </Container>
    </MainContainer>
  )
}

export default Top10LeaderboardPage
