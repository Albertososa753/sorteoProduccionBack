import express from "express";
const router = express.Router();
import { updateAccumulatedNumbers } from "../controllers/accumNum.controller.js";

router.post("/update-accumulated-numbers", updateAccumulatedNumbers);

export default router;
