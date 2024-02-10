const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PanSchema = new Schema({
  fromAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  transferType: {
    type: String,
    enum: ["toAccount", "email", "mobileNumber"],
    required: true,
  },
  toAccount: {
    type: String,
    required: function () {
      return this.transferMode === "toAccount";
    },
  },
  email: {
    type: String,
    required: function () {
      return this.transferMode === "email";
    },
  },
  mobileNumber: {
    type: String,
    required: function () {
      return this.transferMode === "mobileNumber";
    },
  },
  //transactionDate: { type: Date, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  type: { type: String, required: true },
  status: { type: String, default: "pending" },
  paymentDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time when a document is created
  },
});

module.exports = mongoose.model("PAN", PanSchema);
