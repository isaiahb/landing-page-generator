import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";

export function IntroPage(props: {
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