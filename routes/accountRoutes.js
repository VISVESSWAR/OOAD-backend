const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountsController");

// Route to apply for a new account
router.post("/apply", accountController.applyForAccount);

// Route to get all accounts for a user
router.get("/user/:userId", accountController.getUserAccounts);

// Route to update the account type
router.put("/update/:accountId", accountController.updateAccountType);

module.exports = router;
