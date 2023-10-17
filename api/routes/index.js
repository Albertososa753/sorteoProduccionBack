import express from "express";
const router = express.Router();
import adminRouter from "./admin.routes.js";
import paymentRouter from "./payment.routes.js";
import accumulatedNumbers from "./accumNum.routes.js";

router.use("/admin", adminRouter);
router.use("/mp", paymentRouter);
router.use("/acummNum", accumulatedNumbers);

export default router;
