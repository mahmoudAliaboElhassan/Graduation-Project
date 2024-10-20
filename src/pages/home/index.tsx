import React, { useEffect, useState } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";
import IntroductorySection from "../../components/introductory";

function HomePage() {
  const hints = ["One", "Two", "Three"];
  const [number, setNumber] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1000);
  }, [number]);
  return (
    <div style={{ position: "relative", height: "calc(100vh - 69px)" }}>
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
