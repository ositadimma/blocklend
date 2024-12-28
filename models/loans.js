const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const loanSchema = new mongoose.Schema({
  loanRequest:{
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  lendRequest:{
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  loaneeId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  }, 
  loanerId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  loaneeAccId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  loanerAccId: {
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
  interest: {
    type: String,
    maxlength: 255,
  },
  totalPayable: {
    type: String,
    maxlength: 255,
  },
  amount: {
    type: String,
    maxlength: 255,
  },
  installmenton: {
    type: String,
    default: '1'
  },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { type: Boolean, default: true },
});


const Loan = mongoose.model("Loan", loanSchema);

module.exports.Loan = Loan;
