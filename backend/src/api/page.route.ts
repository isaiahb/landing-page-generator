
import express, { Response, Request } from "express";
import * as GenerateService from "../services/generate.service"
import * as PageService from "../services/page.service"
export const router = express.Router();

// Create Page.
async function createPage(req: Request, res: Response) {
  try {
    // Check if page already exists.
    const _page = await PageService.getPageByTitle(req.body.title);

    // if page already exists, update it.
    if (_page) {
      const page = await PageService.updatePageByTitle(req.body.title, req.body);
      return res.json(page);
    }

    const page = await PageService.createPage(req.body);
    return res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function deletePage(req: Request, res: Response) {
  try {
    const page = await PageService.deletePageByTitle(req.params.title);
    return res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Get page by title.
async function getPageByTitle(req: Request, res: Response) {
  try {
    const page = await PageService.getPageByTitle(req.params.title);
    return res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Get all pages.
async function getAllPages(req: Request, res: Response) {
  try {
    const pages = await PageService.getAllPages();
    return res.json(pages);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Update page by title.
async function updatePageByTitle(req: Request, res: Response) {
  try {
    const page = await PageService.updatePageByTitle(req.params.title, req.body);
    return res.json(page);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Router for /api/page.
router.post("/page", createPage);
router.delete("/page/:title", deletePage);
router.get("/page/:title", getPageByTitle);
router.get("/page", getAllPages);
router.put("/page/:title", updatePageByTitle);
