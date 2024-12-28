const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: String
  },
  senderAccId: {
    type: String
  },
  recieverAccId: {
    type: String
  },
  currency: {
    type: String
  },
  amount: {
    type: Number
  },
  hash: {
    type: String
  },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports.Transaction = Transaction;
