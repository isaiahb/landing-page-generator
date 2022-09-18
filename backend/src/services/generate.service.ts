import openai from "../connections/openai.client";
import cohere from "../connections/cohere.client";
import { CreateCompletionResponse } from "openai";
import * as AssetsService from "./assets.service";
import dotenv from "dotenv";
dotenv.config();

const SITE_URL = process.env.SITE_URL as string;
if (!SITE_URL) throw new Error("SITE_URL is not defined");
const API_URL = process.env.API_URL as string;
if (!API_URL) throw new Error("API_URL is not defined");

const colors = {
  purple: "#6C63FF",
  orange: "#F9A826",
  red: "#F50057",
  green: "#00BFA6",
  blue: "#00B0FF",
}

const colorAccents = {
  purple: "#544CD2",
  orange: "#E09728",
  red: "#DC0050",
  green: "#00A08C",
  blue: "#00A0E8",
}

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

  image?: string;
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

  console.log("📂 FILES:", AssetsService.fileNames);
  const closestImage = AssetsService.getClosestEmbeddingFileName(idea);

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
    solution,

    // Best Image.
    closestImage,
  ];
  
  const results = await Promise.all(promises);
  const image = `${API_URL}/${results[6]}`;
  console.log("Closest Image:", image);

  const output: LandingPageOutput = {
    title: results[0],
    tagline: results[1],
    description: results[2],
    actionButtonText: results[3],

    problemStatement: results[4],
    solutionStatment: results[5],

    image,
  };
  return output;
}
