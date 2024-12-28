const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const installmentSchema = new mongoose.Schema({
  loanId: {
    type: String
  },
  schedule: {
    type: String
  },
  amount: {
    type: String
  },
  completed: {
    type: String,
    default: 'coming'
  },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Installment = mongoose.model("Installment", installmentSchema);

module.exports.Installment = Installment;
