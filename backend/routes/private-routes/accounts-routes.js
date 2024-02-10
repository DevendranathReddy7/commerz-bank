const express = require("express");
const router = express.Router();
const accountControllers = require("../../controllers/private-controllers/accounts-controllers");
//create an account
router.post("/open-an-account", accountControllers.openAnAccount);

//get accounts by userId

router.get("/:uid", accountControllers.getAccountByUserId);

module.exports = router;
