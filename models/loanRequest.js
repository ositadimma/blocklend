const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const loanRequestSchema = new mongoose.Schema({
  loaneeId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  amount:{
    type: String,
    maxlength: 255,
  },
  loaneeAccId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  start: {
    type: String,
    maxlength: 255,
  },
  installments: {
    type: String,
    maxlength: 255,
  },
  completed: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);

module.exports.LoanRequest = LoanRequest;
