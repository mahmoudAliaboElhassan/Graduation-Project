import { Grid, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import useSocialMedia from "../../hooks/use-social-media";

function SocialMedia() {
  const { socialLinks } = useSocialMedia();
  return (
    <Grid container spacing={2} justifyContent="center">
      {socialLinks.map(({ icon, url, title }, index) => (
        <Grid item key={index} xs={1} md={12}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <IconButton
              component="a"
              href={url}
              target="_blank"
              color="primary"
              title={title}
            >
              {icon}
            </IconButton>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default SocialMedia;
