import { useEffect } from "react";
import "./App.css";
import { Box } from "@mui/material";
import Header from "./Header";
import { IntroPage } from "./sections/Intro";
import { ProblemStatementPage } from "./sections/ProblemStatement";
import { TestimonialsSection } from "./sections/Testimonials";
import { AboutSection } from "./components/about";

function LandingPage(props: {
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  actionButtonText: string;
  actionButtonURL: string;

  problemStatement?: string;
  solutionStatment?: string;

  testimonials?: {
    name: string;
    description: string;
  }[];

  teammates?: {
    name: string;
    description: string;
    image: string;
  }[];
}) {
  const {
    title,
    tagline: tagLine,
    description,
    image,
    imageAlt,
    actionButtonText,
    actionButtonURL,

    // Problem statement.
    problemStatement,
    solutionStatment,

    // Testimonials.
    testimonials,

    // Teammates.
    teammates,
  } = props;
  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title.split(":")[0].split("-")[0];
  }, [title]);

  return (
    <Box>
      {/* Appbar */}
      <Header
        pages={["Problem Statement", "Real Testimonials", "Contact Us"]}
        title={title.split(":")[0].split("-")[0]}
      />

      {/* Intro */}
      <IntroPage
        title={title.split(":")[0].split("-")[0]}
        description={description}
        tagline={tagLine}
        actionButtonText={actionButtonText}
        actionButtonURL={actionButtonURL}
        image={image}
      />

      {/* Problem statement */}
      {problemStatement && solutionStatment && (
        <ProblemStatementPage
          problemStatement={problemStatement}
          solutionStatment={solutionStatment}
        />
      )}

      {/* Real testimonials */}
      <TestimonialsSection testimonials={testimonials ?? []} />

      {/* About team */}
      {teammates && <AboutSection people={teammates} />}

      {/* Contact us */}

      {/* Image */}
    </Box>
  );
}

export default LandingPage;
