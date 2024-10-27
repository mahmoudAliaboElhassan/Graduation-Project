import { useTheme } from "@emotion/react";

function UseThemMode() {
  const theme = useTheme() as any;
  const themeMode: "dark" | "light" = theme.palette.mode;
  return { themeMode };
}

export default UseThemMode;
