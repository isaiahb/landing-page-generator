import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PromptPage from "./PromptPage";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

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

function OurLandingPage() {
  const [landingPage, setLandingPage] = useState({
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
    teammates: [],
  });
  const [loading, setLoading] = useState(false);
  const title = "My Landing Page";
  const description = "A website that lets you enter a short description about your project and generates a landing page for you.";

  useEffect(() => {
    if (loading) return;
    async function getLandingPageInput() {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/generate/${title}, ${description}`
        );
        setLandingPage(response.data);
        console.log({...response.data, });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getLandingPageInput();
  }, []);
  
  if (!landingPage) {
    return <div>Loading...</div>;
  }

  return (
    <LandingPage
      title={landingPage.title}
      tagline={landingPage.tagline}
      description={landingPage.description}
      image={landingPage.image}
      imageAlt={landingPage.imageAlt}
      actionButtonText={landingPage.actionButtonText}
      problemStatement={landingPage.problemStatement}
      solutionStatment={landingPage.solutionStatment}
      testimonials={landingPage.testimonials}
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
        <Route path="/joe/" element={<JoeMama />} />
        <Route path="*" element={<OurLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
