import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Box,
  alpha,
  styled,
} from "@mui/material";
import { Menu, Search, Notifications, Settings } from "@mui/icons-material";
import UseDirection from "../../hooks/use-direction";

interface AdminHeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export function AdminHeader({ onMenuToggle, sidebarOpen }: AdminHeaderProps) {
  const { direction } = UseDirection();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        color: "#1976d2",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          {/* Always show menu toggle */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
          >
            <Menu />
          </IconButton>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <SearchContainer>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </SearchContainer>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
