//middlewares
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

//models
const { Admin } = require("../models/admin");
const { User, validateUser } = require("../models/user");
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
const { celebrate, Joi } = require("celebrate");
const Helpers = require("../Helpers/helpers");
const Fawn = require("fawn");


mongoose.set("useFindAndModify", false);

// Image Upload
const multer = require("multer");
const { ObjectId } = require("mongodb");
const { Student } = require("../models/student");
const { Subject } = require("../models/subject");
const { Parent } = require("../models/parent");

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
router.get("/get_user", auth, async (req, res) => {
  const user = await User.find({_id: req.user.id});
  let result = { status: "success", error: false, data: wards };
  res.send(result);
});

// get all parent's ward's subjects
router.get("/get_account/:id", auth, async (req, res) => {
  const subjects = await Student.find({_id: req.params.id}, 'subjects');
  var subjectDetails= []
  for (let index = 0; index < subjects.length; index++) {
    var newSubject= await Subject.find({_id: subjects[index]});
    subjectDetails= [...subjectDetails, newSubject]  
  }
  let result = { status: "success", error: false, data: subjectDetails };
  res.send(result);
});

// Get all admins in DB;
router.get("/get_parent", auth , async (req, res) => {
  const parent = await Parent.findOne({userId: req.user.id});
  let result = { status: "success", error: false, data: parent };
  res.send(result);
});


module.exports = router;
