import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PromptPage from "./PromptPage";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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

function CreateLandingPageFromUrl() {
  // Get title and idea params from the URL.
  const { title: TITLE, idea } = useParams();
  const [landingPageInput, setLandingPageInput] = useState({
    title: "",
    tagline: "",
    description: "",
    image: "",
    imageAlt: "",
    actionButtonText: "",

    // Problem statement.
    problemStatement: "",
    solutionStatment: "",

    // Testimonials.
    testimonials: [],

  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return;
    async function getLandingPageInput() {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/generate/${idea}`
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

      // Problem statement.
      problemStatement={landingPageInput.problemStatement}
      solutionStatment={landingPageInput.solutionStatment}

      // Testimonials.
      testimonials={landingPageInput.testimonials}
      
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create/:title/:idea" element={<CreateLandingPageFromUrl />} />
        <Route path="/github/:username/:repo" element={<PromptPage />} />
        <Route path="/prompt/" element={<PromptPage />} />
        <Route path="*" element={<JoeMama />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
