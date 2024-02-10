const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountsSchema = new Schema({
  accountName: { type: String },
  accountNumber: { type: String },
  balance: { type: String },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Accounts", AccountsSchema);
