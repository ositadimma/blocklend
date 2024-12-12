const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Account } = require("../models/accounts");
const { LendRequest } = require("../models/lendRequest");
const { LoanRequest } = require("../models/loanRequest");
const { Admin } = require("../models/admin");
const { Loan } = require("../models/loans");
const { Helpers } = require("../Helpers/helpers");
const { User } = require("../models/users");

//file upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
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
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

router.use('/uploads', express.static('uploads'));

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/register", async (req, res) => {
    //generate an initial password for the admin

    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);
      return hashed_password;
    };


    try{
      console.log(req.body)
      const password = await hashPassword(req.body.password);
      const user = new User({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        type: 'admin',
        phone: req.body.phone,
        password: password,
      });
      await user.save(); 
      res.redirect('/uploads')
    
    } catch (e) {
      console.log(e);
      return res.send({
        status: "failed",
        error: true,
        message: "user could not be created",
      });
    }
  });

router.post("/api", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ error: true, message: "user does not exist" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send({ error: true, message: "Invalid passsword" });
  if(!user.status){
    return res
    .status(500)
    .send({ error: true, message: "This user is no longer active" });
  }

  const token = user.generateAuthToken();
  const result = {
    idToken: token,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    middlename: user.username,
    email: user.email
  };

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
