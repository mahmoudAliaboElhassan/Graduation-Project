import { styled } from "@mui/material/styles"
import { Card } from "@mui/material"

export const FooterContainer = styled(Card)<{ mode: string }>(({ mode }) => ({
  padding: "80px 0",
  lineHeight: "1.5",
  textAlign: "center",
  fontFamily: "Monomakh !important",
  fontSize: "20px",
  background:
    mode === "light"
      ? "linear-gradient(to top, #c31432, #240b36)"
      : "linear-gradient(0deg, #1a1a2e, #4b000f)",
  color: "white",
  transition: "all 0.3s ease-in-out",

  backdropFilter: "blur(50px)",
  marginTop: "auto", // This pushes the footer to the bottom
}))

// Add this new styled component for the main layout wrapper
export const PageWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Full viewport height
})

// Add this for the main content area
export const MainContent = styled("main")({
  flex: "1 0 auto", // This makes the main content grow and shrink as needed
  display: "flex",
  flexDirection: "column",
})
