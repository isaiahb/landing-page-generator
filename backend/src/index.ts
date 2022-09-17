/**
 * Required External Modules
 */

import dotenv from "dotenv";
import express, {  } from "express";
import cors from "cors";
import helmet from "helmet";
import { Api } from "./api";
import cookieParser from "cookie-parser";
import * as mongoConnection from "./connections/mongo.connection";

dotenv.config();
mongoConnection.init();

if (!process.env.PORT) { process.exit(1); }
const PORT: number = parseInt(process.env.PORT as string, 10)
const SITE_URL = process.env.SITE_URL as string;
if (!SITE_URL) throw new Error("SITE_URL is not defined");

/**
 *  App Configuration
 */
const app = express();
app.use(helmet());
app.use(cors({ credentials: true, origin: [
  '*', 
  'http://localhost:3000', 
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  SITE_URL,
] }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use("/api", Api);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  return;
});