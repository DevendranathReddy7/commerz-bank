const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payeeSchema = new Schema({
  payeeName: { type: String, required: true },
  ifscCode: { type: String },
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
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("payee", payeeSchema);
