const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FtxSchema = new Schema({
  fromAccount: { type: String, required: true },
  toAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  //transactionDate: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  type: { type: String, required: true },
  paymentDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time when a document is created
  },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Ftx", FtxSchema);
