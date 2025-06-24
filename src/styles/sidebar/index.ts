// / layout/Caelmnnooopsttuy.tsx;
import { styled } from "@mui/material/styles";
import { Box, AppBar, Drawer, ListItemButton, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DirectionType } from "../../utils/types/general";

const drawerWidth = 280;

type StyledProps = {
  open?: boolean;
  direction: DirectionType;
  isMobile?: boolean;
};

export const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
}));

export const MainContent = styled("main", {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "direction" && prop !== "isMobile",
})<StyledProps>(({ theme, open = false, direction, isMobile = false }) => {
  const isRTL = direction.direction === "rtl";
  const baseStyles: any = {
    flexGrow: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0,
      width: "100%",
    },
  };

  if (isMobile) {
    return {
      ...baseStyles,
      marginLeft: 0,
      marginRight: 0,
      width: "100%",
    };
  }

  return {
    ...baseStyles,
    marginLeft: !isRTL ? (open ? drawerWidth : 0) : 0,
    marginRight: isRTL ? (open ? drawerWidth : 0) : 0,
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
});

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "direction" && prop !== "isMobile",
})<StyledProps>(({ theme, open, direction, isMobile }) => {
  const baseStyles = {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: `0 2px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0,
      width: "100%",
    },
  };

  if (isMobile) return baseStyles;

  return {
    ...baseStyles,
    [direction.marginLeft]: open ? drawerWidth : 0,
    [direction.marginRight]: 0,
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
});

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "direction",
})<{ direction: DirectionType }>(({ theme, direction }) => {
  const isRTL = direction.direction === "rtl";
  return {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      borderLeft: isRTL ? `1px solid ${theme.palette.divider}` : "none",
      borderRight: !isRTL ? `1px solid ${theme.palette.divider}` : "none",
      boxShadow: isRTL
        ? `-4px 0 20px ${alpha(theme.palette.primary.main, 0.2)}`
        : `4px 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
      overflowX: "hidden",
    },
  };
});

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "direction",
})<{ direction: DirectionType }>(({ theme, direction }) => {
  const isRTL = direction.direction === "rtl";
  return {
    margin: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    transition: "all 0.3s ease",
    "&:hover": {
      transform: isRTL ? "translateX(-4px)" : "translateX(4px)",
    },
    "&.Mui-selected": {
      borderLeft: !isRTL ? `4px solid ${theme.palette.primary.main}` : "none",
      borderRight: isRTL ? `4px solid ${theme.palette.primary.main}` : "none",
    },
  };
});

export const WelcomeCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  maxWidth: "800px",
  margin: "0 auto",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

export const CenteredContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  minHeight: "100%",
});
