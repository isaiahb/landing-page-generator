import dotenv from "dotenv";
dotenv.config();
import cohere from "cohere-ai";

const COHERE_API_KEY = process.env.COHERE_API_KEY as string;
cohere.init(COHERE_API_KEY);

(async () => {
  console.log("cohere, cothere")
  const response = await cohere.generate({
    prompt: "Is cohere better or is gpt-3 better?",
    temperature: 0.5,
    // preset: "",
  } as any
);
  console.log(`Prediction: ${JSON.stringify(response.body)}`);
})();

export default cohere;