import express from "express";
const router = express.Router();
import {
  registerAdmin,
  loginAdmin,
  meAdmin,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import { validateAuth } from "../middlewares/validateAuht.js";

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", validateAuth, meAdmin);
router.get("/logout", logoutAdmin);

export default router;
