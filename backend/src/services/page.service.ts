import openai from "../connections/openai.client";
import cohere from "../connections/cohere.client";
import { CreateCompletionResponse } from "openai";
import * as AssetsService from "./assets.service";
import {Page, PageI} from "../models/page.model";
import dotenv from "dotenv";
dotenv.config();


const SITE_URL = process.env.SITE_URL as string;
if (!SITE_URL) throw new Error("SITE_URL is not defined");

const API_URL = process.env.API_URL as string;
if (!API_URL) throw new Error("API_URL is not defined");

export async function createPage(page: PageI): Promise<PageI> {
  return await Page.create(page);
}

// Get page by title.
export async function getPageByTitle(title: string): Promise<PageI | null> {
  return await Page.findOne({ title });
}

// Update page by title.
export async function updatePageByTitle(title: string, page: PageI): Promise<PageI | null> {
  return await Page.findOneAndUpdate({ title }, page, { new: true });
}

// Delete page by title.
export async function deletePageByTitle(title: string): Promise<PageI | null> {
  return await Page.findOneAndDelete({ title });
}

// Get all pages.
export async function getAllPages(): Promise<PageI[]> {
  return await Page.find();
}
