const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const lendRequestSchema = new mongoose.Schema({
  loanerId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  amount:{
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  loanerAccId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const LendRequest = mongoose.model("LendRequest", lendRequestSchema);

module.exports.LendRequest = LendRequest;
