import { Router } from "express";
import {
  selectReviews,
  selectReviewsByID,
} from "../controllers/reviews.controllers.js";
const routes_reviews = new Router();

routes_reviews.get("/reviews", selectReviews);

routes_reviews.post("/reviews", selectReviewsByID);

export default routes_reviews;
