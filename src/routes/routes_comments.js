import { Router } from "express";
import {
  createReviewComment,
  getReviewComments,
  deleteReviewComment,
} from "../controllers/comments.controllers.js";

const routes_comments = Router();

routes_comments.post("/createComment", createReviewComment);

routes_comments.post("/getComments", getReviewComments);

routes_comments.post("/deleteComment", deleteReviewComment);

export default routes_comments;
