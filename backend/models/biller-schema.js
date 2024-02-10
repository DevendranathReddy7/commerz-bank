const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billerSchema = new Schema({
  billerName: { type: String, required: true },
  billerCode: { type: String, required: true },
  billerRef: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("biller", billerSchema);
