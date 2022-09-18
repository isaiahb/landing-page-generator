import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function JoeMama() {
  return (
    <LandingPage
      title={"Find Joe"}
      tagline={"Who's Joe?"}
      description={"Joe mamaaa!!!! hahahahahahah joeeeee maaaaamaaaaa"}
      image={""}
      imageAlt={""}
      actionButtonText={"Find Joe"}
    />
  );
}

function LandingPageTemplate() {
  // Get title and idea params from the URL.
  const { title: TITLE, idea } = useParams();
  const [landingPageInput, setLandingPageInput] = useState({
    title: "",
    tagline: "",
    description: "",
    image: "",
    imageAlt: "",
    actionButtonText: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return;
    async function getLandingPageInput() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:7001/api/generate/${idea}`
        );
        setLandingPageInput(response.data);
        console.log({...response.data, });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getLandingPageInput();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LandingPage
      title={landingPageInput.title}
      tagline={landingPageInput.tagline}
      description={landingPageInput.description}
      image={landingPageInput.image}
      imageAlt={landingPageInput.imageAlt}
      actionButtonText={landingPageInput.actionButtonText}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:title/:idea" element={<LandingPageTemplate />} />

        <Route path="*" element={<JoeMama />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
