const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");
const { validateAuth } = require("../middlewares/validateAuht");

router.post("/register", AdminController.registerAdmin);
router.post("/login", AdminController.loginAdmin);
router.get("/me", validateAuth, AdminController.meAdmin);
router.get("/logout", AdminController.logoutAdmin);

module.exports = router;
