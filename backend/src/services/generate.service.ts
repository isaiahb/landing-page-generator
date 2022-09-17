import openai from "../connections/openai.client";
import { CreateCompletionResponse } from "openai";

//Define types for the output.
type LandingPageOutput = {
  title: string;
  tagline: string;
  description: string;
  actionButtonText: string;
};

async function createCompletion(prompt: string, model = "text-davinci-002"): Promise<string> {
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
  const titlePrompt = `Create a title for the landing page for the idea: ${idea}`;
  const title = await createCompletion(titlePrompt);

  const taglinePrompt = "Create a tagline for the following idea: " + idea;
  const tagline = await createCompletion(taglinePrompt);

  const descriptionPrompt = "Create a description for the following idea: " + idea;
  const description = await createCompletion(descriptionPrompt);

  const actionButtonTextPrompt = "Create a call to action button text for the following idea: " + idea;
  const actionButtonText = await createCompletion(actionButtonTextPrompt);

  return {
    title,
    tagline,
    description,
    actionButtonText,
  };
}
