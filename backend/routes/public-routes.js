const express = require("express");
const publicController = require("../controllers/public-controllers.js");
const router = express.Router();

router.post("/login", publicController.login);
router.post("/signin", publicController.signin);

module.exports = router;
