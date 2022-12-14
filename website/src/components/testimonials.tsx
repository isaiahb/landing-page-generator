import { useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";


export function TestimonialSection(props: {
    people: {name: string, testimonial: string, image: string}[]
  }) {
    const { people } = props;
    console.log("Intro page props: ", props);
  
    return (
      <Box
        width={"100vw"}
        // height="100vh"
      >
        <Container maxWidth="lg">
            {
              people.map(person => (
                <Box
                  padding={"10px"} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <img src={person.image} alt={person.name} width={"50px"} />
                    <Box padding={"10px"}>{person.name}</Box>
                    <Box padding={"10px"}>{person.testimonial}</Box>
                </Box>
              ))
            }
            
            
        </Container>
      </Box>
    );
  }