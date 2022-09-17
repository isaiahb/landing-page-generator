import { useEffect } from "react";
import "./App.css";
import { Box, Container, Typography, Button } from "@mui/material";
import Header from "./Header";

function IntroPage(props: {
  title: string;
  description: string;
  subtitle: string;
  buttonText: string;
}) {
  const { title, description, subtitle, buttonText } = props;

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
          <Typography fontWeight={500} fontSize={28}>
            {title}
          </Typography>
          <Typography fontWeight={700} fontSize={36} paddingTop="5px">
            {subtitle}
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
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function LandingPage(props: {
  name: string;
  tagLine: string;
  description: string;
  image: string;
  imageAlt: string;
  actionText: string;
}) {
  const { name, tagLine, description, image, imageAlt, actionText } = props;
  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = name;
  }, [name]);

  return (
    // <div className="App">
    //   {/* <h1>{name}</h1>

    //   <div className="card">
    //     <button >
    //       {actionText}
    //     </button>
    //     <p>
    //       {tagLine}
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     {description}
    //   </p> */}
    //   <IntroPage title={name} description={description} subtitle={tagLine} buttonText={actionText} />
    // </div>

    <Box
    // width={"100vw"}
    >
      {/* Appbar */}
      <Header pages={[]} title={name} />

      {/* Intro */}
      <IntroPage
        title={name}
        description={description}
        subtitle={tagLine}
        buttonText={actionText}
      />
    </Box>
  );
}

export default LandingPage;
