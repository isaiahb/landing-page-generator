import { useEffect } from "react";
import { Box, Container, TextField, Typography, Button } from "@mui/material";


export function ContactSection(props: {
    // title: string;
    // description: string;
    // tagline: string;
    // actionButtonText: string;
  }) {
    // const { title, description, tagline: tagLine, actionButtonText } = props;
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
            <Box padding={"10px"}>
              <TextField id="outlined-basic" label="Name" variant="outlined" />
            </Box>
            <Box padding={"10px"}>
              <TextField id="outlined-basic" label="Email" variant="outlined" />
            </Box>
            <Box padding={"10px"}>
              <TextField id="outlined-basic" label="Message" variant="outlined" multiline={true} minRows={3} />
            </Box>
            <Box padding={"10px"}>
              <Button variant="contained">Send Feedback</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }