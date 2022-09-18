import { useEffect } from "react";
import "./App.css";
import { Box, Container, Typography, Button } from "@mui/material";
import Header from "./Header";
// Angry salmon roll, LA Kalbi roll, and the spicy salmon roll.

function IntroPage(props: {
  title: string;
  description: string;
  tagline: string;
  actionButtonText: string;
}) {
  const { title, description, tagline: tagLine, actionButtonText } = props;
  console.log("Intro page props: ", props);

  return (
    <Box
      width={"100vw"}
      // height="100vh"
    >
      <Container maxWidth="lg">
        <Box
          width="100%"
          paddingTop={"150px"}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize={36} paddingTop="5px">
            {tagLine}
          </Typography>

          {/* <Box paddingTop={"20px"} maxWidth={"500px"}> */}
          <Typography maxWidth={600} paddingTop="10px" textAlign={"center"}>
            {description}
          </Typography>

          <Box paddingTop={"50px"}>
            {/* On click navigate to /signup-or-login */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: "black", fontWeight: "600" }}
              onClick={() => {
                // window.location.href = "/signup-or-login";
              }}
            >
              {actionButtonText}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function LandingPage(props: {
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  actionButtonText: string;
}) {
  const { title, tagline: tagLine, description, image, imageAlt, actionButtonText } = props;
  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

  return (
    <Box
    >
      {/* Appbar */}
      <Header pages={[]} title={title} />

      {/* Intro */}
      <IntroPage
        title={title}
        description={description}
        tagline={tagLine}
        actionButtonText={actionButtonText}
      />
    </Box>
  );
}

export default LandingPage;
