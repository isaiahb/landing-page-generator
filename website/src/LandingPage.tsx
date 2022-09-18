import { useEffect } from "react";
import "./App.css";
import { Box, Container, Typography, Button } from "@mui/material";
import Header from "./Header";

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
      minHeight="100vh"
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

          <Box paddingTop={"50px"} paddingBottom={"50px"}>
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

function ProblemStatementPage(props: {
  problemStatement: string;
  solutionStatment: string;
  bgcolor?: string;
}) {
  const { problemStatement, solutionStatment } = props;

  return (
    <Box width={"100vw"} minHeight="100vh" bgcolor={props.bgcolor ?? "#F5F5F5"}>
      <Container maxWidth="lg">
        <Box
          width="100%"
          paddingTop={"150px"}
          display="flex"
          flexDirection={"column"}
          // alignItems="center"
        >
          <Typography  fontSize={36} paddingTop="15px" textAlign={"left"}>
            {problemStatement}
          </Typography>

          <Typography paddingTop="20px" textAlign={"left"}>
            {solutionStatment}
          </Typography>
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

  problemStatement?: string;
  solutionStatment?: string;
}) {
  const {
    title,
    tagline: tagLine,
    description,
    image,
    imageAlt,
    actionButtonText,

    // Problem statement.
    problemStatement,
    solutionStatment,
  } = props;
  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

  return (
    <Box>
      {/* Appbar */}
      <Header pages={["Problem Statement", "Real Testimonials", "Contact Us"]} title={title} />

      {/* Intro */}
      <IntroPage
        title={title}
        description={description}
        tagline={tagLine}
        actionButtonText={actionButtonText}
      />

      {/* Problem statement */}
      {problemStatement && solutionStatment && (
        <ProblemStatementPage
          problemStatement={problemStatement}
          solutionStatment={solutionStatment}
        />
      )}

      {/* Image */}
    </Box>
  );
}

export default LandingPage;
