const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/private-controllers/payment-controllers.js");

router.post("/funds-transfer", paymentController.postFundsTrasferPayment);
router.post("/bill-payment", paymentController.postBillPayment);
router.post("/pay-anyone", paymentController.postPayAnyonePayment);
router.get("/history/:uid", paymentController.getHistory);
module.exports = router;
