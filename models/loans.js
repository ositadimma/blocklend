const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const loanSchema = new mongoose.Schema({
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
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Loan = mongoose.model("Loan", loanSchema);

module.exports.Loan = Loan;
