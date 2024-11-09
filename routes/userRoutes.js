const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/details", verifyToken, userController.getUserDetails);
router.put("/update", verifyToken, userController.updateUserDetails);

module.exports = router;
