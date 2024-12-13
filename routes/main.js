//middlewares
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

//models
const { Admin } = require("../models/admin");
const { User, validateUser } = require("../models/user");
const { Account } = require("../models/accounts");
const { Token } = require("../models/token");
const { PasswordResetToken } = require("../models/passwordResetToken");

//plugins
const uniqid = require("uniqid");
const util = require("util");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const uniqueRandom = require("unique-random");
const random = uniqueRandom(0, 10);
const Helpers = require("../Helpers/helpers");
const Fawn = require("fawn");


mongoose.set("useFindAndModify", false);

// Image Upload
const multer = require("multer");
const { ObjectId } = require("mongodb");
const { LoanRequest } = require("../models/loanRequest");
const { LendRequest } = require("../models/lendRequest");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg/png/jpg/pdf are allowed!"), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// get all parent's wards
router.get("/api/get_user", auth, async (req, res) => {
  const user = await User.find({_id: req.user.id});
  let result = { status: "success", error: false, data: wards };
  res.send(result);
});

// get all accounts of current user
router.post("/api/get_accounts", auth, async (req, res) => {
  const accounts = await Account.find({userId: req.body.uid});
  let result = { status: "success", error: false, data: accounts };
  res.send(result);
});

// get single account
router.post("/api/get_account", auth , async (req, res) => {
  const account = await Account.findOne({_id: req.body._id});
  let result = { status: "success", error: false, data: account };

  res.send(result);
});

// add crypto account to wallet
router.post("/api/add_account", auth, async (req, res) => {
  const account= new Account({
    userId: req.user.id, 
    accountId: req.body.accId,
    accountKey: req.body.accKey,
    currency: req.body.currency
  })
  await account.save()
  
  let result = { status: "success", error: false, data: account };
  res.send(result);
});

// create a loan request
router.post("/api/create_loan_request", auth, async (req, res) => {
  const request= new LoanRequest({
    loaneeId: req.user.id,
    amount:req.body.amount,
    loaneeAccId: req.body.accId,
  })
  await request.save()
  
  let result = { status: "success", error: false, data: request };
  res.send(result);
});

// get loan Request
router.post("/api/get_loan_request", auth , async (req, res) => {
  const request = await LoanRequest.findOne({_id: req.body.id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});


// Get Loan Requests
router.post("/api/get_loan_requests", auth , async (req, res) => {
  const request = await LoanRequest.find();
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// Search Loan Requests
router.post("/api/search_loan_requests", auth , async (req, res) => {
  const request = await LoanRequest.findOne({_ID: req.body.id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// create a lend request
router.post("/api/create_lend_request", auth, async (req, res) => {
  const request= new LendRequest({
    loanerId: req.user.id,
    amount: req.body.amount,
    loanerAccId: req.body.accId
  })
  await request.save()
  
  let result = { status: "success", error: false, data: request };
  res.send(result);
});

// get lend request
router.post("/api/get_lend_request", auth , async (req, res) => {
  const request = await LendRequest.findOne({_id: req.body.id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});


// create loan requests
router.post("/api/get_lend_requests", auth , async (req, res) => {
  const request = await LendRequest.find();
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// create Loan Requests
router.post("/api/search_lend_requests", auth , async (req, res) => {
  const request = await LendRequest.findOne({_ID: req.body.id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});




module.exports = router;
