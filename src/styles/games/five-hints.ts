import { alpha, Card } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { styled } from "@mui/material/styles"
import { Link } from "react-router-dom"

export const Hint = styled(Grid)({
  border: "3px solid white",
  borderRadius: "8px",
  minHeight: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})
export const getGradient = (isDarkMode: boolean) =>
  ({
    light: "linear-gradient(to top, #c31432, #240b36)",
    dark: "linear-gradient(0deg, #1a1a2e, #4b000f)",
  }[isDarkMode ? "dark" : "light"])

export const CustomeCard = styled(Card)(({ theme }) => {
  const isDarkMode = theme.palette.mode === "dark"

  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    borderRadius: theme.spacing(3),

    // Modern glass morphism effect
    background: isDarkMode
      ? alpha("#1e1e2e", 0.6)
      : "linear-gradient(to top, #c31432, #240b36)",

    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",

    // Subtle border for depth
    border: `1px solid ${alpha(isDarkMode ? "#fff" : "#000", 0.1)}`,

    // Smooth transitions
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    // Modern shadow system
    boxShadow: isDarkMode
      ? "0 8px 32px rgba(0, 0, 0, 0.4)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",

    // Hover effects
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: isDarkMode
        ? "0 12px 40px rgba(0, 0, 0, 0.5)"
        : "0 12px 40px rgba(0, 0, 0, 0.15)",
    },

    // Pseudo-element for gradient border effect on hover
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.spacing(3),
      padding: "1px",
      background: isDarkMode
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },

    "&:hover::before": {
      opacity: 0.6,
    },

    // Content styling - inherit text color from theme
    color: isDarkMode ? "white" : theme.palette.text.primary,

    // Card content areas
    "& .MuiCardContent-root": {
      flexGrow: 1,
      padding: theme.spacing(3),
      color: "inherit",
    },

    "& .MuiCardActionArea-root": {
      height: "100%",
      color: "inherit",
    },

    "& .MuiCardActions-root": {
      padding: theme.spacing(2, 3),
      color: "inherit",
    },

    // Typography inherits color
    "& .MuiTypography-root": {
      color: "inherit",
    },

    // Buttons get modern styling
    "& .MuiButton-root": {
      borderRadius: theme.spacing(2),
      textTransform: "none",
      fontWeight: 600,
      transition: "all 0.2s ease",

      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(255, 255, 255, 0.1)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
    },

    // Icon colors inherit
    "& .MuiSvgIcon-root": {
      color: "inherit",
    },

    // Chip styling
    "& .MuiChip-root": {
      borderRadius: theme.spacing(1.5),
      fontWeight: 600,
      transition: "all 0.2s ease",

      "&:hover": {
        transform: "scale(1.05)",
      },
    },

    // Divider with gradient
    "& .MuiDivider-root": {
      background: isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1),
    },

    // Form controls
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(2),

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(isDarkMode ? "#fff" : "#000", 0.2),
        transition: "all 0.3s ease",
      },

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(isDarkMode ? "#fff" : "#000", 0.3),
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },

    // List items
    "& .MuiListItem-root": {
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
      transition: "background-color 0.2s ease",

      "&:hover": {
        backgroundColor: alpha(isDarkMode ? "#fff" : "#000", 0.05),
      },
    },

    // Paper elements inside card
    "& .MuiPaper-root": {
      borderRadius: theme.spacing(2),
      transition: "all 0.2s ease",
    },

    // Loading states
    "& .MuiCircularProgress-root": {
      color: theme.palette.primary.main,
    },

    // Links
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontWeight: 600,
      transition: "all 0.2s ease",

      "&:hover": {
        textDecoration: "underline",
        opacity: 0.8,
      },
    },
  }
})

export const Timer = styled(Grid)<{ timeExceeded: boolean }>(
  ({ timeExceeded }) => ({
    width: "fit-content",
    margin: "auto",
    borderRadius: "50%",
    padding: "19px",
    backgroundColor: timeExceeded ? "green" : "#eee",
    marginBottom: "10px",
    color: timeExceeded ? "white" : "black",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "1rem",
  })
)

export const LinkPlay = styled(Link)<{ dir: string }>(({ theme, dir }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "16px 32px",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  textDecoration: "none",
  borderRadius: "50px",
  minHeight: "56px",
  minWidth: "200px",
  position: "relative",
  overflow: "hidden",
  // More subtle background that matches your theme
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  color: "#ffffff",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  "&:hover": {
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",

    "& .MuiSvgIcon-root": {
      transform: dir === "ltr" ? "translateX(4px)" : "translateX(-4px)",
    },
  },

  "&:active": {
    transform: "translateY(0px)",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.3)",
  },

  [theme.breakpoints.down("sm")]: {
    minWidth: "180px",
    padding: "14px 24px",
    fontSize: "1rem",
  },

  "&:focus-visible": {
    outline: "2px solid rgba(255, 255, 255, 0.8)",
    outlineOffset: "2px",
  },
}))
