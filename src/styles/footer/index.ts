import { styled } from "@mui/material/styles";

export const FooterContainer = styled("div")<{ mode: string }>(({ mode }) => ({
  padding: "80px 0",
  lineHeight: "1.5",
  textAlign: "center",
  fontFamily: "Monomakh !important",
  fontSize: "20px",
  background:
    mode === "dark"
      ? "linear-gradient(0deg, #101021, #32000a)"
      : "linear-gradient(0deg, #b81c1a, #002a52)",
  color: "white",
  marginTop: "auto", // This pushes the footer to the bottom
}));

// Add this new styled component for the main layout wrapper
export const PageWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Full viewport height
});

// Add this for the main content area
export const MainContent = styled("main")({
  flex: "1 0 auto", // This makes the main content grow and shrink as needed
  display: "flex",
  flexDirection: "column",
});
