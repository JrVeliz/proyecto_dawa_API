import { Router } from "express";
import { selectNews, selectNewsById } from "../controllers/news.controllers.js";

const routes_news = Router();

routes_news.get("/news", selectNews);

routes_news.post("/news", selectNewsById);

export default routes_news;
