import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import SocialMedia from "../../components/socialMedia";
import ContactForm from "../../components/contactForm";
import UseMediaQuery from "../../hooks/use-media-query";

function Contacts() {
  const isSmallScreen = UseMediaQuery({ query: "(max-width: 898px)" });
  const isBigScreen = UseMediaQuery({ query: "(min-width: 500px)" });

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        <Grid
          item
          xs={12}
          md={1}
          style={{ marginBottom: isSmallScreen && isBigScreen ? "-120px" : "" }}
        >
          <SocialMedia />
        </Grid>
        <Grid item xs={12} md={11}>
          <ContactForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contacts;
