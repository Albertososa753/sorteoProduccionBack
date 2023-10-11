const adminRouter = require("./admin.routes");
const paymentRouter = require("./payment.routes")
const express = require("express");
const router = express.Router();

router.use("/admin", adminRouter);
router.use("/mp", paymentRouter);

module.exports = router;
