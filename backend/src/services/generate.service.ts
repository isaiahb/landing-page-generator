import openai from "../connections/openai.client";
import cohere from "../connections/cohere.client";
import { CreateCompletionResponse } from "openai";
import * as AssetsService from "./assets.service";
import dotenv from "dotenv";
import { PageI } from "../models/page.model";
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

//Define types for the output.
// type LandingPageOutput = {
//   // Intro Section.
//   title: string;
//   tagline: string;
//   description: string;
//   actionButtonText: string;

//   // Additional Info Section.
//   problemStatement?: string;
//   solutionStatment?: string;

//   // Teammates Section.  
//   teammates?: Teammate[];

//   // Testimonials Section.
//   testimonials?: Testimonial[];

//   image?: string;
// };

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
    temperature: 0.6,
    max_tokens: 512,
    top_p: .9,
    best_of: 1,
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

export async function generateLandingPageOutput(idea: string, teammates: {name?: string, description: string, url: string}[] = []): Promise<PageI> {
  console.log("Idea:", idea);
  // Call openAI api to generate comment text.

  console.log("📂 FILES:", AssetsService.fileNames);
  const closestImage = AssetsService.getClosestEmbeddingFileName(idea);

  const titlePrompt = `Create a short title for the landing page for the idea: ${idea}`;
  const title = createCompletion(titlePrompt);

  const taglinePrompt = "Create a tagline for the following idea: " + idea;
  const tagline = createCompletion(taglinePrompt);

  const descriptionPrompt = "Create a description for the our product idea: " + idea;
  const description = createCompletion(descriptionPrompt);

  const actionButtonTextPrompt = "Create a call to action button text for the following idea: " + idea;
  const actionButtonText = createCompletion(actionButtonTextPrompt);

  const problemStatementPrompt = "Create a mind stimulating tagline about the issue our idea solves. idea: " + idea;
  const problemStatement = createCompletion(problemStatementPrompt);

  const solutionPrompt = "Describe our solution for the following idea: " + idea + "Description: " + description + "Problem Statement: " + problemStatement + "Solution : ";
  const solution = createCompletion(solutionPrompt);

  const teammatePrompts = teammates.map((teammate) => {
    const teammatePrompt = "Create a description for the following teammate: " + teammate.name + "Description: " + teammate.description;
    return createCompletion(teammatePrompt);
  });

  // Create testimonials.
  const testimonialPromises: Promise<string>[] = [];
  const namePromises = [];
  for (let i = 0; i < 6; i++) {
    const testimonialPrompt = "Create a testimonial for the following idea: " + idea;
    const testimonial = createCompletion(testimonialPrompt, "text-curie-001");
    const randomName = createCompletion("Pick a name of a random living famous person", "text-davinci-002");
    testimonialPromises.push(testimonial);
    namePromises.push(randomName);
  }

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
  const _teammates = (await Promise.all(teammatePrompts)).map((teammatePrompt, index) => {
    return {
      name: teammates[index].name ?? "Teammate",
      description: teammatePrompt,
      image: teammates[index].url,
    }
  });
  const _names = await Promise.all(namePromises);
  const _testimonials = (await Promise.all(testimonialPromises)).map((testimonial, index) => {
    return {
      name: _names[index].trim().split(",")[0],
      description: testimonial,    }
  }).filter((testimonial) => testimonial.name.split(" ").length <= 3);

  const image = `${API_URL}/${results[6]}`;
  console.log("Closest Image:", image);
  console.log("Testimonials:", _testimonials);

  const output: PageI = {
    title: results[0],
    tagline: results[1],
    description: results[2],
    actionButtonText: results[3],

    problemStatement: results[4],
    solutionStatment: results[5],

    teammates: _teammates,
    testimonials: _testimonials,

    image,
  };
  return output;
}
