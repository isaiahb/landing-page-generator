import { useEffect, useState } from "react";
import "./App.css";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import api, { PageI } from "./api";

type Teammate = {
  name: string;
  description: string;
  image: string;
};

function Page() {
  const [prompt, setPrompt] = useState({ title: "", description: "" });
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onPromptChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPrompt({ ...prompt, [event.target.name]: event.target.value });
  }

  async function createLandingPage() {
    if (loading) return;
    setLoading(true);
    try {
      const pageInputs: PageI = (await api.generate.create(prompt.title + " - " + prompt.description)).data as PageI;
      const page = await api.page.create({...pageInputs, title: prompt.title});
      navigate(`/page/${prompt.title}`);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Box width={"100vw"}>
      <Container maxWidth="md">
        <Box
          width="100%"
          paddingTop={"120px"}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          <Typography
            fontWeight={600}
            fontSize={28}
            paddingBottom="20px"
          >
            Tell us about your product!
          </Typography>

          {/* Text area for product title */}
          <TextField
            id="outlined-basic"
            name="title"
            label="Product Title"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            onChange={onPromptChange}
            value={prompt.title}
          />

          {/* Text area for short product description. */}
          <TextField
            id="outlined-basic"
            name="description"
            label="Product Description"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            multiline
            minRows={6}
            onChange={onPromptChange}
            value={prompt.description}
          />

          {/* Section to add group members, a plus button to add a new text field. */}
          <Box
            width="100%"
            paddingTop={"10px"}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
          >
            <Typography
              fontWeight={500}
              fontSize={18}
              paddingTop="10px"
              paddingBottom="10px"
              textAlign={"left"}
              width="100%"
            >
              Add your team members!
            </Typography>

            {/* Add team members here. */}
            {teammates.map((teammate, index) => (
              <Box width="100%" paddingTop={"10px"} flexDirection={"column"} key={index}>
                <Typography paddingTop="10px">Teammate {index + 1}</Typography>
                <TextField
                  id="outlined-basic"
                  name="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  required
                  style={{ width: "100%" }}
                  onChange={(event) => {
                    const newTeammates = [...teammates];
                    newTeammates[index].name = event.target.value;
                    setTeammates(newTeammates);
                  }}
                  value={teammate.name}
                />

                <TextField
                  id="outlined-basic"
                  name="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  required={true}
                  style={{ width: "100%", marginTop: "5px" }}
                  multiline
                  onChange={(event) => {
                    const newTeammates = [...teammates];
                    newTeammates[index].description = event.target.value;
                    setTeammates(newTeammates);
                  }}
                  value={teammate.description}
                />

                <TextField
                  id="outlined-basic"
                  name="image"
                  label="Image"
                  variant="outlined"
                  size="small"
                  required={false}
                  style={{ width: "100%", marginTop: "5px" }}
                  onChange={(event) => {
                    const newTeammates = [...teammates];
                    newTeammates[index].image = event.target.value;
                    setTeammates(newTeammates);
                  }}
                  value={teammate.image}
                />
              </Box>
            ))}

            <Box width={"100%"}>
              {/* Add a new team member. */}
              <Button
                variant="contained"
                style={{ marginTop: "20px", marginRight:"5px", backgroundColor: "black" }}
                onClick={() => {
                  setTeammates([
                    ...teammates,
                    { name: "", description: "", image: "" },
                  ]);
                }}
              >
                Add Teammate
              </Button>

              {/* Button to delete last teammate */}
              <Button
                variant="contained"
                style={{
                  marginTop: "20px",
                  backgroundColor: "darkred",
                  fontWeight: "600",
                }}
                onClick={() => {
                  const newTeammates = [...teammates];
                  newTeammates.pop();
                  setTeammates(newTeammates);
                }}
              >
                Delete Last Teammate
              </Button>
            </Box>
          </Box>

          <Box paddingTop={"50px"} display="flex" width={"100%"} paddingBottom="50px">
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: "black", fontWeight: "600" }}
              onClick={() => {
                // const url = `/create/${prompt.title}/${prompt.description}`;
                // navigate(url);
                createLandingPage();
              }}
              fullWidth
            >
              <Typography>Create Landing Page</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function CreatePage(props: {}) {
  const TITLE = "My Landing Page - Prompt";
  document.title = TITLE;

  return (
    <Box>
      {/* Appbar */}
      <Header pages={[]} title={TITLE} />

      {/* Page */}
      <Page />
    </Box>
  );
}

export default CreatePage;
