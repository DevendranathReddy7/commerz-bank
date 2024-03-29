const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  password: { type: String, required: true, minlength: 6 },
  accounts: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Accounts" },
  ],
});

module.exports = mongoose.model("User", UserSchema);
