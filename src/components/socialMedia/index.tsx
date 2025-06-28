import { Grid, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { motion } from "framer-motion";
import useSocialMedia from "../../hooks/use-social-media";
import UseMediaQuery from "../../hooks/use-media-query";
import { useTheme } from "@emotion/react";

function SocialMedia() {
  const { socialLinks } = useSocialMedia();
  const theme = useTheme();

  return (
    <Grid container spacing={4} style={{ justifyContent: "space-evenly" }}>
      {socialLinks.map(({ icon, url, title }, index) => (
        <Grid item key={index} xs={1} md={12}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Tooltip title={title}>
              <IconButton
                component="a"
                sx={{
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                  "&:focus-visible": {
                    outlineOffset: "2px",
                  },
                }}
                href={url}
                target="_blank"
                color="primary"
                // title={title}
              >
                {icon}
              </IconButton>
            </Tooltip>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default SocialMedia;
