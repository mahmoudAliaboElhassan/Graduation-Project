import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Container,
  Grid,
  Paper,
  Fade,
  Zoom,
  Skeleton,
  Stack,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import {
  EmojiEvents as TrophyIcon,
  WorkspacePremium as MedalIcon,
  Grade as StarIcon,
  LocalFireDepartment as FireIcon,
  People as UsersIcon,
  MyLocation as TargetIcon,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getTopTen } from "../../state/act/actAuth";
import { useTranslation } from "react-i18next";

// Types
interface PlayerData {
  name: string;
  totalPoints: number;
}

// Styled components & animations
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;
const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  zIndex: 0,
}));
const HeaderCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(45deg, ${alpha(
    theme.palette.common.white,
    0.1
  )} 30%, ${alpha(theme.palette.common.white, 0.05)} 90%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  borderRadius: theme.spacing(3),
  textAlign: "center",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-200px",
    width: "200px",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(
      theme.palette.common.white,
      0.1
    )}, transparent)`,
    animation: `${shimmer} 3s infinite`,
  },
}));
const TopPlayerCard = styled(Card)<{ rank: number }>(({ theme, rank }) => {
  const getGradient = () => {
    switch (rank) {
      case 1:
        return "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
      case 2:
        return "linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)";
      case 3:
        return "linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)";
      default:
        return `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`;
    }
  };
  return {
    background: alpha(theme.palette.common.white, 0.95),
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s cubic‑bezier(0.4,0,0.2,1)",
    cursor: "pointer",
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: `0 16px 48px ${alpha(theme.palette.common.black, 0.2)}`,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: getGradient(),
    },
  };
});
const RankBadge = styled(Avatar)<{ rank: number }>(({ theme, rank }) => {
  const getColors = () => {
    switch (rank) {
      case 1:
        return {
          bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          color: "#8B4513",
        };
      case 2:
        return {
          bg: "linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)",
          color: "#2F4F4F",
        };
      case 3:
        return {
          bg: "linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)",
          color: "#FFFFFF",
        };
      default:
        return {
          bg: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "#FFFFFF",
        };
    }
  };
  const colors = getColors();
  return {
    position: "absolute",
    top: -16,
    left: "50%",
    transform: "translateX(-50%)",
    width: 40,
    height: 40,
    background: colors.bg,
    color: colors.color,
    fontWeight: "bold",
    fontSize: "1.1rem",
    boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.3)}`,
    zIndex: 1,
    animation: `${pulse} 2s infinite`,
  };
});
const PlayerRow = styled(Paper)<{ rank: number; isCurrentUser?: boolean }>(
  ({ theme, rank, isCurrentUser }) => ({
    background: isCurrentUser
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.1
        )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
      : alpha(theme.palette.common.white, 0.8),
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    transition: "all 0.3s ease",
    border: isCurrentUser
      ? `2px solid ${theme.palette.primary.main}`
      : `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
    "&:hover": {
      transform: "translateX(8px)",
      boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.15)}`,
    },
  })
);
const PointsDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "1.8rem",
}));

// Helper functions
const getRankIcon = (rank: number): JSX.Element => {
  const iconProps = { sx: { fontSize: 32 } };
  switch (rank) {
    case 1:
      return (
        <TrophyIcon {...iconProps} sx={{ ...iconProps.sx, color: "#FFD700" }} />
      );
    case 2:
      return (
        <MedalIcon {...iconProps} sx={{ ...iconProps.sx, color: "#C0C0C0" }} />
      );
    case 3:
      return (
        <MedalIcon {...iconProps} sx={{ ...iconProps.sx, color: "#CD7F32" }} />
      );
    default:
      return (
        <StarIcon
          {...iconProps}
          sx={{ ...iconProps.sx, color: "primary.main" }}
        />
      );
  }
};
const formatPoints = (points: number): string => points.toLocaleString();

// Sub-components
interface TopPlayerCardProps {
  player: PlayerData;
  rank: number;
  isCurrentUser: boolean;
  delay: number;
}
const TopPlayerCardComponent: React.FC<TopPlayerCardProps> = ({
  player,
  rank,
  isCurrentUser,
  delay,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Zoom in timeout={500 + delay * 200}>
      <Box sx={{ position: "relative", height: "100%" }}>
        <TopPlayerCard rank={rank}>
          <RankBadge rank={rank}>{rank}</RankBadge>
          <CardContent sx={{ pt: 4, textAlign: "center" }}>
            <Box sx={{ mb: 2 }}>{getRankIcon(rank)}</Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "black",
              }}
            >
              {player.name}
            </Typography>
            <PointsDisplay variant="h4">
              {formatPoints(player.totalPoints)}
            </PointsDisplay>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, mb: 2 }}
            >
              {t("top10.points")}
            </Typography>
            {isCurrentUser && (
              <Chip
                label={t("top10.you")}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontWeight: "bold",
                }}
              />
            )}
          </CardContent>
        </TopPlayerCard>
      </Box>
    </Zoom>
  );
};

interface PlayerRowProps {
  player: PlayerData;
  rank: number;
  isCurrentUser: boolean;
  delay: number;
}
const PlayerRowComponent: React.FC<PlayerRowProps> = ({
  player,
  rank,
  isCurrentUser,
  delay,
}) => {
  const { t } = useTranslation();
  return (
    <Fade in timeout={300 + delay * 100}>
      <PlayerRow rank={rank} isCurrentUser={isCurrentUser}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <RankBadge
              rank={rank}
              sx={{
                position: "relative",
                top: 0,
                left: 0,
                transform: "none",
                width: 48,
                height: 48,
                animation: "none",
              }}
            >
              {rank}
            </RankBadge>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {getRankIcon(rank)}
            </Box>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {player.name}
                </Typography>
                {isCurrentUser && (
                  <Chip
                    label={t("top10.you")}
                    color="primary"
                    size="small"
                    variant="filled"
                  />
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {t("top10.rank", { number: rank })}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {formatPoints(player.totalPoints)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("top10.points")}
            </Typography>
          </Box>
        </Stack>
      </PlayerRow>
    </Fade>
  );
};

// Loading component
const LoadingComponent: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Skeleton
        variant="text"
        width={300}
        height={80}
        sx={{ mx: "auto", mb: 2 }}
      />
      <Skeleton variant="text" width={200} height={40} sx={{ mx: "auto" }} />
    </Box>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} md={4} key={i}>
          <CardContent>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mx: "auto", mb: 2 }}
            />
            <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={48} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} />
          </CardContent>
        </Grid>
      ))}
    </Grid>
    <Stack spacing={2}>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={80}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Stack>
  </Container>
);

// Main component
const Top10LeaderboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { topTen, loadingGetTopTen } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getTopTen());
  }, [dispatch]);

  const isCurrentUser = (index: number) => index === topTen?.me;
  const hasData = topTen?.data.length > 0;
  const topThree = hasData ? topTen.data.slice(0, 3) : [];
  const remainingPlayers = hasData ? topTen.data.slice(3) : [];

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
    );
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
                      const actualIndex = idx + 3;
                      return (
                        <PlayerRowComponent
                          player={player}
                          rank={actualIndex + 1}
                          isCurrentUser={isCurrentUser(actualIndex)}
                          delay={idx}
                          key={`player-${actualIndex}`}
                        />
                      );
                    })}
                  </Stack>
                </Paper>
              </Fade>
            )}

            {topTen?.me !== undefined &&
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
                      #{topTen.me + 1}
                    </Typography>
                    <Typography variant="h6">
                      {topTen.data[topTen.me].name} •{" "}
                      {formatPoints(topTen.data[topTen.me].totalPoints)}{" "}
                      {t("top10.points")}
                    </Typography>
                  </Paper>
                </Zoom>
              )}
          </>
        )}
      </Container>
    </MainContainer>
  );
};

export default Top10LeaderboardPage;
