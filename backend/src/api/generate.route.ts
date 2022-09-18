
import express, { Response, Request } from "express";
import * as GenerateService from "../services/generate.service"
export const router = express.Router();

async function generateLandingPageInputs(req: Request, res: Response) {
  try {
    const idea: string = req.params.idea;
    const landingPageOutput = await GenerateService.generateLandingPageOutput(idea);
    return res.json(landingPageOutput);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

router.get("/generate/:idea", generateLandingPageInputs);