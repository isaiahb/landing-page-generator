import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PromptPage from "./PromptPage";
import { ContactSection } from "./components/contact";
import { AboutSection } from "./components/about";

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
        <Route path="/prompt/" element={<PromptPage />} />
        <Route path="/test/" element={<ContactSection />} />
        <Route path="/jest/" element={<AboutSection people={[{name: "bob", bio: "nerd", image: "https://1.bp.blogspot.com/-IeuuJ8GCKWQ/TvYypiPE-uI/AAAAAAAAAD4/Ct9VdoiKH70/s1600/smiley+face-face+smile-free-Smiley+Face.png"},
                                                             {name: "rob", bio: "nerdier", image: "https://pngimg.com/uploads/smiley/smiley_PNG27.png"}]}/>} />
        <Route path="*" element={<JoeMama />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
