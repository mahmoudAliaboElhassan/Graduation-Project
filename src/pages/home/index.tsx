import React, { useEffect, useState } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";
import IntroductorySection from "../../components/introductory";
import UseMediaQuery from "../../hooks/use-media-query";

function HomePage() {
  const hints = ["One", "Two", "Three"];
  const [number, setNumber] = useState<number>(0);
  const isBigScreen = UseMediaQuery({ query: "(min-width: 700px)" });

  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1000);
  }, [number]);
  return (
    <div
      style={{
        position: "relative",
        minHeight: isBigScreen ? "calc(100vh - 166px)" : "100vh",
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          minWidth: 275,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <IntroductorySection />
      </Box>
    </div>
  );
}

export default HomePage;
