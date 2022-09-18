import { useEffect } from "react";
import "./App.css";
import { Box } from "@mui/material";
import Header from "./Header";
import { IntroPage } from "./sections/Intro";
import { ProblemStatementPage } from "./sections/ProblemStatement";
import { TestimonialsSection } from "./sections/Testimonials";

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
  } = props;
  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

  return (
    <Box>
      {/* Appbar */}
      <Header
        pages={["Problem Statement", "Real Testimonials", "Contact Us"]}
        title={title.split(":")[0]}
      />

      {/* Intro */}
      <IntroPage
        title={title}
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
      <TestimonialsSection
        testimonials={testimonials ?? []}
      />

      {/* Contact us */}

      {/* Image */}
    </Box>
  );
}

export default LandingPage;
