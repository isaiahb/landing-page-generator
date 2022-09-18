import * as React from "react";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Container, Box, Paper } from "@mui/material";

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

function Testimonial(props: { user: string; message: string }) {
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar>{props.user[0] ?? "A"}</Avatar>
      </Grid>
      <Grid item xs>
        <Typography>{props.message}</Typography>
      </Grid>
    </Grid>
  );
}

export function TestimonialsSection(props: {
  testimonials: { user: string; message: string }[];
  bgcolor?: string;
}) {
  return (
    <Box width={"100vw"}  bgcolor={props.bgcolor ?? "#FFFFFF"}>
      <Container maxWidth="lg">
        <Box
          width="100%"
          paddingTop={"50px"}
          display="flex"
          flexDirection={"column"}
        >
          <Typography fontSize={36} paddingTop="15px" textAlign={"left"}>
            Testimonials
          </Typography>

          <Grid container paddingTop="50px" paddingBottom={"50px"}>
            {props.testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} paddingY="10px">
                <Paper sx={{ padding: "15px", width: "400px" }}>
                  <Testimonial
                    user={testimonial.user}
                    message={testimonial.message}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
