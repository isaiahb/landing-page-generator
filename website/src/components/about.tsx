import { useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";

export function AboutSection(props: {
  people: { name: string; description: string; image: string }[];
}) {
  const { people } = props;
  console.log("Intro page props: ", props);

  return (
    <Box width={"100vw"} bgcolor={"#F5F5F5"}>
      <Container maxWidth="lg">
        <Typography
            fontWeight={500}
            fontSize={24}
            paddingTop={"20px"}
            paddingBottom={"20px"}
            textAlign={"center"}
          >
            The team!
        </Typography>
        <Box
          width="100%"
          paddingTop={"20px"}
          paddingBottom={"20px"}
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
        >
        {people.map((person) => (
          <Box padding={"10px"} sx={{ display: "flex", flexDirection: "column",  }} alignContent="center" alignItems="center" justifyContent={"space-between"} >
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}

            {/* <img src={person.image} alt={person.name} width={"50px"} /> */}
            <Typography padding={"10px"}>{person.name}</Typography>
            <Typography padding={"10px"}>{person.description}</Typography>
          </Box>
        ))}
        </Box>
      </Container>
    </Box>
  );
}
