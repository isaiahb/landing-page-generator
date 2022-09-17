import express from "express";
import {router as generate} from "./generate.route";

export const Api = express.Router();

// AI.
Api.use(generate);
