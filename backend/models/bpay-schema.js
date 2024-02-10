const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BpaySchema = new Schema({
  fromAccount: { type: String, required: true },
  biller: {
    billerName: { type: String, required: true },
    billerCode: { type: Number, required: true },
  },
  amount: { type: Number, required: true },
  message: { type: String },
  //transactionDate: { type: Date, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  type: { type: String, required: true },
  status: { type: String, default: "pending" },
  paymentDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time when a document is created
  },
});

module.exports = mongoose.model("Bpay", BpaySchema);
