import { styled, keyframes } from "@mui/material/styles"
import { Box, Card, Typography, Avatar, Paper, alpha } from "@mui/material"

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

export const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`

export const MainContainer = styled(Box)(({ theme }) => ({
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
}))

export const HeaderCard = styled(Paper)(({ theme }) => ({
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
}))

export const TopPlayerCard = styled(Card)<{ rank: number }>(
  ({ theme, rank }) => {
    const getGradient = () => {
      switch (rank) {
        case 1:
          return "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
        case 2:
          return "linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)"
        case 3:
          return "linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)"
        default:
          return `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`
      }
    }
    return {
      background: alpha(theme.palette.common.white, 0.95),
      backdropFilter: "blur(10px)",
      borderRadius: theme.spacing(2),
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
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
        transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)",
      },
      "&:hover::before": {
        height: "8px",
      },
    }
  }
)
export const RankBadge = styled(Avatar)<{ rank: number }>(({ theme, rank }) => {
  const getColors = () => {
    switch (rank) {
      case 1:
        return {
          bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          color: "#8B4513",
        }
      case 2:
        return {
          bg: "linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)",
          color: "#2F4F4F",
        }
      case 3:
        return {
          bg: "linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)",
          color: "#FFFFFF",
        }
      default:
        return {
          bg: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "#FFFFFF",
        }
    }
  }
  const colors = getColors()
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
  }
})

export const PlayerRow = styled(Paper)<{
  rank: number
  isCurrentUser?: boolean
}>(({ theme, rank, isCurrentUser }) => {
  const isDarkMode = theme.palette.mode === "dark"

  const backgroundColor = isCurrentUser
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.1
      )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
    : isDarkMode
    ? alpha(theme.palette.grey[900], 0.8)
    : alpha(theme.palette.common.white, 0.8)

  const hoverBackgroundColor = isCurrentUser
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.15
      )} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`
    : isDarkMode
    ? alpha(theme.palette.grey[800], 0.95)
    : alpha(theme.palette.common.white, 0.95)

  const borderStyle = isCurrentUser
    ? `2px solid ${theme.palette.primary.main}`
    : isDarkMode
    ? `1px solid ${alpha(theme.palette.grey[700], 0.5)}`
    : `1px solid ${alpha(theme.palette.grey[300], 0.5)}`

  const textColor = isDarkMode
    ? theme.palette.common.white
    : theme.palette.text.primary

  return {
    background: backgroundColor,
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    border: borderStyle,
    boxShadow: `0 4px 12px ${alpha(
      theme.palette.common.black,
      isDarkMode ? 0.3 : 0.08
    )}`,
    cursor: "pointer",
    opacity: 0,
    color: textColor,
    transition:
      "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease",

    "@keyframes fadeInSlide": {
      "0%": {
        opacity: 0,
        transform: "translateX(-20px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },

    "&:hover": {
      transform: "translateX(8px) scale(1.03)",
      animation: `fadeInSlide 0.3s ease-out forwards ${rank * 0.05}s`,

      boxShadow: `0 8px 24px ${alpha(
        theme.palette.common.black,
        isDarkMode ? 0.5 : 0.15
      )}`,
      background: hoverBackgroundColor,
    },
  }
})
export const PointsDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "1.8rem",
}))
