import openai from "../connections/openai.client";
import cohere from "../connections/cohere.client";
import { CreateCompletionResponse } from "openai";

type Teammate = {
  name: string;
  description: string;
  image: string;
};

//Define types for the output.
type LandingPageOutput = {
  // Intro Section.
  title: string;
  tagline: string;
  description: string;
  actionButtonText: string;

  // Additional Info Section.
  problemStatement?: string;
  solutionStatment?: string;

  // Teammates Section.  
  teammates?: Teammate[];
};

async function createCompletion(prompt: string, model = "text-davinci-002"): Promise<string> {
  // const cohereCompletion = await cohere.generate({
  //   prompt: prompt,
  //   temperature: 0.5,
  //   preset: "",
  // });

  // console.log(`Cohere Prediction: ${cohereCompletion.body.generations[0].text}`);
  const completion = await openai.createCompletion({
    prompt,
    model,
    // model: "text-davinci-002",
    // model: "text-curie-001",
    temperature: 0.7,
    max_tokens: 512,
    top_p: .9,
    best_of: 2,
    // user: userId,
  });

  console.log("completion");
  const data: CreateCompletionResponse = completion.data;
  const choices = data.choices;
  if (!choices || choices.length === 0 || !choices[0].text) throw new Error("No choices found.");
  console.log(choices);
  const text = choices[0].text;
  return text;
}

export async function generateLandingPageOutput(idea: string): Promise<LandingPageOutput> {
  console.log("Idea:", idea);
  // Call openAI api to generate comment text.

  const titlePrompt = `Create a short title for the landing page for the idea: ${idea}`;
  const title = createCompletion(titlePrompt);

  const taglinePrompt = "Create a tagline for the following idea: " + idea;
  const tagline = createCompletion(taglinePrompt);

  const descriptionPrompt = "Create a description for the following idea: " + idea;
  const description = createCompletion(descriptionPrompt);

  const actionButtonTextPrompt = "Create a call to action button text for the following idea: " + idea;
  const actionButtonText = createCompletion(actionButtonTextPrompt);

  const problemStatementPrompt = "Create a mind stimulating tagline about the issue our idea solves. idea: " + idea;
  const problemStatement = createCompletion(problemStatementPrompt);

  const solutionPrompt = "Describe our solution for the following idea: " + idea + "Description: " + description + "Problem Statement: " + problemStatement + "Solution : ";
  const solution = createCompletion(solutionPrompt);

   const promises = [
    // Intro Section.
    title,
    tagline,
    description,
    actionButtonText,

    // Problem statement section.
    problemStatement,
    solution

  ];

  const results = await Promise.all(promises);
  const output: LandingPageOutput = {
    title: results[0],
    tagline: results[1],
    description: results[2],
    actionButtonText: results[3],

    problemStatement: results[4],
    solutionStatment: results[5],
  };
  return output;
}
