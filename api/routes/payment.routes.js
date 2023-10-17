import express from "express";
import {
  createAnOrder,
  createThreeOrders,
  createFiveOrders,
  createTenOrders,
  receiveWebHook,
  raffleParticipants,
  deleteAllParticipants,
  getAllParticipants
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-an-order", createAnOrder);
router.post("/create-three-orders", createThreeOrders);
router.post("/create-five-orders", createFiveOrders);
router.post("/create-ten-orders", createTenOrders);
router.post("/webhook", receiveWebHook);
router.get("/success", (req, res) => res.send("success"));
router.get("/failure", (req, res) => res.send("failure"));
router.get("/pending", (req, res) => res.send("pending"));

router.get("/raffle", raffleParticipants);
router.get("/deleteAllParticipants", deleteAllParticipants);
router.get("/getAllParticipants", getAllParticipants);

export default router;
