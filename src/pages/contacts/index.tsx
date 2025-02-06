import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import SocialMedia from "../../components/socialMedia";
import ContactForm from "../../components/contactForm";

function Contacts() {
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <Grid item xs={12} md={1}>
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
