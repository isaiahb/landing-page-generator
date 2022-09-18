import express from "express";
import {router as generate} from "./generate.route";
import {router as page} from "./page.route";

export const Api = express.Router();

// AI.
Api.use(generate);
Api.use(page);
