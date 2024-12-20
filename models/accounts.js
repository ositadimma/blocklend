const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const accountSchema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  }, 
  accountId: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Account = mongoose.model("Account", accountSchema);

module.exports.Account = Account;
