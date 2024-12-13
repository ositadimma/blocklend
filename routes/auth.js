const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");
const { Account } = require("../models/accounts");
const { LendRequest } = require("../models/lendRequest");
const { LoanRequest } = require("../models/loanRequest");
const { Admin } = require("../models/admin");
const { Loan } = require("../models/loans");
const { Helpers } = require("../Helpers/helpers");
const { User } = require("../models/users");
const uploadMiddleware = require('../middleware/uploadMiddleware');

//file upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random+Date.now()+'-'+ file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only images are allowed!')); // Reject file
  }
};

const upload = multer({
  dest: 'uploads/',
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});


router.post("/api/register", async (req, res) => {

    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);
      return hashed_password;
    };
console.log(req.body);
    const password = await hashPassword(req.body.password);
    console.log('nehdddd')
    console.log('neh')
    const firstname= req.body.firstname
    const middlename= req.body.middlename
    const lastname= req.body.lastname
    const email= req.body.email
    const phone= req.body.phone
    const dob= req.body.dob
    const gender= req.body.gender
    const user = new User({
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      type: 'user',
      phone: phone,
      password: password,
      dob: dob,
      gender: gender
    });
    console.log('yh')
    user.save(); 
    return res
    .status(200)
    .send({ error: false, message: "success"});
 
  });

router.post("/api", async (req, res) => {
  console.log('bdghd1')
  console.log(req.body)
  const { error } = validate(req.body);
  console.log('bdghd2')
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error.details[0].message });
      console.log('bdghd3')
  let user = await User.findOne({ email: req.body.email });
  console.log('bdghd4')
  console.log(user)

  if (!user)
    return res
      .status(400)
      .send({ error: true, message: "user does not exist" });
      console.log('bdghd5')

  const validPassword = await bcrypt.compare(req.body.password, user.password);
console.log('bdghd')
  if (!validPassword)
    return res.status(400).send({ error: true, message: "Invalid passsword" });
  console.log('bdghd6')
  if(!user.status){
    return res
    .status(500)
    .send({ error: true, message: "This user is no longer active" });
  }
  console.log('bdghd7')

  const token = user.generateAuthToken();
  console.log('bdghd8')
  const result = {
    idToken: token,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    middlename: user.username,
    email: user.email
  };
  // const secret= 'BL_VAULT'
  // const token = jwt.sign(
  //   { id: user._id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     middlename: user.username,
  //     email: user.email }, // Payload
  //     secret, // Secret key replace later
  //   { expiresIn: '24h' } // Token expiration
  // );
  console.log('bdghd9')
  console.log(result)
  return res
    .status(200)
    .send({ error: false, message: "success", data: result });
});


function validate(req) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().min(6).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
