import { Router } from "express";
import { selectTopGames,selectTopGamesByID } from "../controllers/topjuegos.controlles.js";
const routes_topjuegos = Router();

routes_topjuegos.get("/topjuegos", selectTopGames);

routes_topjuegos.post("/topjuegos", selectTopGamesByID);

export default routes_topjuegos;
