//middlewares
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

//models
const { Admin } = require("../models/admin");
const { User } = require("../models/users");
const { Account } = require("../models/accounts");
const { Transaction } = require("../models/transactions");
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
const { LoanRequest } = require("../models/loanRequest");
const { LendRequest } = require("../models/lendRequest");
const { Loan } = require("../models/loans");
const { duration } = require("moment");
const { Installment } = require("../models/installments");
const { schedule } = require("node-cron");

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
  const user = await User.find({_id: req.user._id});
  let result = { status: "success", error: false, data: wards };
  res.send(result);
});

// get all accounts of current user
router.post("/api/get_accounts", auth, async (req, res) => {
  console.log(req.user)
  console.log('tru')
  const accounts = await Account.find({userId: req.user._id});
  let result = { status: "success", error: false, data: accounts };
  console.log(accounts)
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
  console.log('yh')
  const account= new Account({
    userId: req.user._id, 
    accountId: req.body.accId,
    currency: req.body.currency
  })
  console.log('yh')
  await account.save()
  
  let result = { status: "success", error: false, data: account };
  res.send(result);
});

// create a loan request
router.post("/api/create_loan_request", auth, async (req, res) => {
  const request= new LoanRequest({
    loaneeId: req.user._id,
    amount:req.body.amount,
    start: req.body.start,
    loaneeAccId: req.body.account,
    installments: req.body.installments
  })
  await request.save()
  
  let result = { status: "success", error: false, data: request };
  res.send(result);
});

// get loan Request
router.post("/api/get_loan", auth , async (req, res) => {
  const request = await Loan.findOne({loaneeId: req.user._id, isActive: true, status: true});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});


// get loan Request
router.post("/api/wallet/send_money", auth , async (req, res) => {
  const request = new Transaction({
    senderId: req.user._id,
    senderAccId: req.body.from,
    recieverAccId: req.body.payeeAccId,
    amount: req.body.amount,
    hash: req.body.hash
  })
  await request.save()
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

router.get("/api/clear", async (req, res) => {
  const request = await LoanRequest.deleteMany({});
  const request1 = await LendRequest.deleteMany({});
  const request2 = await Loan.deleteMany({});
  const request3 = await User.deleteMany({});
  const request4 = await Transaction.deleteMany({});
  const request5 = await LendRequest.deleteMany({});
  const request6 = await Installment.deleteMany({});
  const request7 = await Account.deleteMany({});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});






router.post("/api/get_request_loan", auth , async (req, res) => {
  const request = await LoanRequest.findOne({_id: req.body.id, isActive: true});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

router.post("/api/get_loans", auth , async (req, res) => {
  console.log(req.user._id)
  const request = await Loan.find({loaneeId: req.user._id, isActive: true});

  let result = { status: "success", error: false, data: request };

  res.send(result);
});


// Get Loan Requests
router.post("/api/get_loan_requests", auth , async (req, res) => {
  const request = await LoanRequest.find({loaneeId: req.user._id, isActive: true, completed: false});
  console.log(request)
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

router.post("/api/get_loan_request", auth , async (req, res) => {
  const request = await LoanRequest.findOne({_id: req.body.id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// Search Loan Requests
router.post("/api/search_loan_requests", auth , async (req, res) => {
  const request = await LoanRequest.findOne({_ID: req.body.id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});


// Search Loan Requests
router.post("/api/get_all_loan_requests", auth , async (req, res) => {
  const request = await LoanRequest.find({isActive: true, loaneeId: { $ne: req.user._id } });
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// Search Loan Requests
router.post("/api/loans/accept_lend_offer", auth , async (req, res) => {
  const request = await LendRequest.findOne({_id: req.body.id});
  request.accepted= true;
  const updatedRequest= await request.save()
  console.log(updatedRequest)
  let result = { status: "success", error: false, data: request };
  res.send(result);
})

router.post("/api/loans/get_my_lendings", auth , async (req, res) => {
  const loani= await Loan.find({isActive: true})
  console.log(loani)
  console.log('gh')
  const loans= await Loan.find({loanerId: req.user._id, isActive: true})
  console.log('gh1')
  console.log(loans)
  let result = { status: "success", error: false, data: loans?loans:{} };
  console.log('gh3')
  res.send(result);
})

router.post("/api/loans/repay_loan", auth , async (req, res) => {
  const loan= await Loan.findOne({_id: req.body.id})
  console.log(loan)
  const installment= await Installment.findOne({loanId: req.body.id, schedule: loan.installmenton})
  console.log(installment)
  console.log(loan)
  installment.completed= 'fulfilled'
  installment.isActive= false
  await installment.save()
  if(loan.installmenton>=loan.installments){
    loan.isActive= false
  }
  loan.installmenton= parseInt(loan.installmenton)+1
  await loan.save()
  
  let result = { status: "success", error: false, data: loan};
  console.log('gh3')
  res.send(result);
})

router.post("/api/show", auth , async (req, res) => {
  const loani= Loan.find({isActive: true})
  console.log(loani)
})




// Search Loan Requests
router.post("/api/loans/finalize_loan", auth , async (req, res) => {
  const request = await LendRequest.findOne({_id: req.body.id});
  const loanRequest= await LoanRequest.findOne({_id: request.loanId});
  request.completed= true
  await request.save();
  loanRequest.completed= true
  await loanRequest.save();
  const loan= new Loan({
    loaneeId: loanRequest.loaneeId,
    loanRequest: request.loanId,
    lendRequest: req.body.id,
    loanerId: request.loanerId,
    installments: loanRequest.installments,
    loaneeAccId: loanRequest.loaneeAccId,
    loanerAccId: request.loanerAccId,
    interest: request.interest,
    start: request.start,
    amount: loanRequest.amount,
    totalPayable: (parseInt(loanRequest.amount)*parseInt(request.interest)/100)+parseInt(loanRequest.amount)
  })
  
  await loan.save()
  var installments= parseInt(loanRequest.installments)
  for (let index = 0; index < installments; index++) {
    const installment= new Installment({
      loanId: loan._id,
      schedule: index+1,
      amount: parseInt(loan.totalPayable) /installments,
    })
    await installment.save()
  }
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

router.get("/api/up", async (req, res) => {
  const loan= await Loan.findOne({});
  loan.installmenton= '1'
  loan.save()
  console.log(loan)
  res.send(loan)
})

router.get("/api/delo", async (req, res) => {
  const loan= await Loan.deleteMany({});
  const trx= await Transaction.deleteMany({});
  const lrx= await LoanRequest.deleteMany({});
  const ldrx= await LendRequest.deleteMany({});
  const idrx= await Installment.deleteMany({});
  res.send(loan)
})

// create a lend request
router.post("/api/create_lend_request", auth, async (req, res) => {
  const request= new LendRequest({
    loanId: req.body.id,
    loanerId: req.user._id,
    loaneeAccId: req.body.loaneeAccId,
    loanerAccId: req.body.accId,
    interest: req.body.interest,
    start: req.body.start,
    amount: req.body.amount
  })
  await request.save()
  
  let result = { status: "success", error: false, data: request };
  res.send(result);
});

// get lend request
router.post("/api/get_lend_request", auth , async (req, res) => {
  const request = await LendRequest.findOne({_id: req.body.id, completed: false});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// create loan requests
// router.get("/del", auth , async (req, res) => {
//   const request = await Account.deleteMany();
//   let result = { status: "success", error: false, data: request };

//   res.send(result);
// });

// create loan requests
router.post("/api/get_lend_requests", auth , async (req, res) => {
  const request = await LendRequest.find({loanerId: req.user._id});
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// create loan requests
router.post("/api/get_loan_lend_requests", auth , async (req, res) => {
  console.log(req.body)
  const request = await LendRequest.find({loanId: req.body.id});
  const request1 = await LendRequest.find({});
  const request2 = await LoanRequest.find({});
  console.log(request)
  console.log(request1)
  console.log(request2)
  let result = { status: "success", error: false, data: request };

  res.send(result);
});

// create Loan Requests
// router.post("/api/search_lend_requests", auth , async (req, res) => {
//   const request = await LendRequest.findOne({_ID: req.body.id});
//   let result = { status: "success", error: false, data: request };

//   res.send(result);
// });




module.exports = router;
