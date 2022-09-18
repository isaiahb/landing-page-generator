import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid } from "@mui/material";

export function IntroPage(props: {
  title: string;
  description: string;
  tagline: string;
  actionButtonText: string;
  image: string;
}) {
  const { title, description, tagline, actionButtonText, image } = props;
  console.log("Intro page props: ", props);

  return (
    <Box width={"100vw"} minHeight="100vh">
      <Container maxWidth="lg">
        <Box
          width="100%"
          paddingTop={"125px"}
          display="flex"
          flexDirection={"column"}
          alignItems={image ? "left" : "center"}
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography fontWeight={700} fontSize={36} >
                {tagline}
              </Typography>

              {/* <Box paddingTop={"20px"} maxWidth={"500px"}> */}
              <Typography
                maxWidth={600}
                paddingTop="10px"
                textAlign={image ? "left" : "center"}
              >
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
            </Grid>
            {image && (
              <Grid item xs={12} md={6} p="20px">
                <img src={image} style={{maxWidth: "100%"}} alt="intro" />
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
