import { Grid, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { motion } from "framer-motion";
import useSocialMedia from "../../hooks/use-social-media";
import UseMediaQuery from "../../hooks/use-media-query";

function SocialMedia() {
  const { socialLinks } = useSocialMedia();

  return (
    <Grid container spacing={4} justifyContent="center">
      {socialLinks.map(({ icon, url, title }, index) => (
        <Grid item key={index} xs={1} md={12}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Tooltip title={title}>
              <IconButton
                component="a"
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
