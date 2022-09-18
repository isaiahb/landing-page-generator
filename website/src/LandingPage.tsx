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

  problemStatement?: string;
  solutionStatment?: string;
}) {
  const {
    title,
    tagline: tagLine,
    description,
    image,
    imageAlt,
    actionButtonText,

    // Problem statement.
    problemStatement,
    solutionStatment,
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
        title={title}
      />

      {/* Intro */}
      <IntroPage
        title={title}
        description={description}
        tagline={tagLine}
        actionButtonText={actionButtonText}
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
        testimonials={[
          { user: "John Doe", message: "This is a great product!" },
          { user: "Jane Doe", message: "This is a great product!" },
          { user: "Josh Doe", message: "This is the best product!" },
          { user: "Jake Doe", message: "This is the greatest product!" },
        ]}
      />

      {/* Contact us */}

      {/* Image */}
    </Box>
  );
}

export default LandingPage;
