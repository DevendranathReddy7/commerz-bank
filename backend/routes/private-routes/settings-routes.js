const express = require("express");
const router = express.Router();

const settingsController = require("../../controllers/private-controllers/settings-controller.js");

router.post("/create-billers", settingsController.createBillers);
router.post("/edit-biller", settingsController.editBillers);
router.get("/billers/:uid", settingsController.getBillers);
router.delete("/billers/:bid", settingsController.deleteBillers);

router.post("/create-payees", settingsController.createPayees);
router.post("/edit-payee", settingsController.editPayees);
router.get("/payees/:uid", settingsController.getPayees);
router.delete("/payees/:bid", settingsController.deletePayees);

module.exports = router;
