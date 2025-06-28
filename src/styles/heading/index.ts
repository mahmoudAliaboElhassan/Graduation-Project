import { styled } from "@mui/material/styles";
import "@fontsource/montez";
import { Typography, TypographyProps } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";

interface HeadingElementProps extends TypographyProps {
  isMainHeading?: boolean;
}

export const HeadingElement = styled(Typography)<HeadingElementProps>(
  ({ theme, isMainHeading = true }) => {
    // Get mode from Redux store inside the component
    const { mymode } = useAppSelector((state) => state.mode);

    return {
      padding: theme.spacing(0.25),
      flexGrow: 1,
      fontFamily: '"Montez", "cursive"',
      textAlign: "center",
      fontSize: isMainHeading
        ? "clamp(2rem, 5vw, 3rem)"
        : "clamp(2.5rem, 6vw, 3.5rem)",
      fontStyle: "italic",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
      maxWidth: "700px",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: isMainHeading ? 600 : 400,
      letterSpacing: "0.05em",
      textShadow:
        mymode === "dark"
          ? "2px 2px 4px rgba(0, 0, 0, 0.7)"
          : "1px 1px 2px rgba(0, 0, 0, 0.3)",

      // Colors that align with your gradient backgrounds
      color:
        mymode === "dark"
          ? "#e0e0e0" // Light gray for dark mode
          : "#f5f5f5", // Very light gray for light mode

      // Add subtle gradient text effect for main headings
      ...(isMainHeading && {
        background:
          mymode === "dark"
            ? "linear-gradient(135deg, #ffffff, #e0e0e0)"
            : "linear-gradient(135deg, #ffffff, #f0f0f0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }),

      // Responsive adjustments
      [theme.breakpoints.down("sm")]: {
        fontSize: isMainHeading
          ? "clamp(1.5rem, 8vw, 2rem)"
          : "clamp(2rem, 9vw, 2.8rem)",
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
      },

      // Hover effect for interactive headings
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: isMainHeading ? "scale(1.02)" : "scale(1.01)",
        filter: "brightness(1.1)",
      },

      // Focus styles for accessibility
      "&:focus-visible": {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: "4px",
        borderRadius: theme.spacing(0.5),
      },
    };
  }
);
