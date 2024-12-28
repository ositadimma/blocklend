const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
const string = require("joi/lib/types/string");

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  middlename: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  dob: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: { type: "String" },
  createdBy: { type: "String" },
  status: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  newPassword: {
    type: String,
    minlength: 6,
    maxlength: 255,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  kyc: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      type: this.type
    },
    process.env.jwtPrivateKey,
    {}
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// function validateUser(user) {
//   const schema = {
//     firstname: Joi.string().min(3).max(255),
//     lastname: Joi.string().min(3).max(255),
//   };
//   return Joi.validate(user, schema);
// }

// function validateUserUpdate(user) {
//   const schema = {
//     firstname: Joi.string().min(3).max(255),
//     lastname: Joi.string().min(3).max(255),
//   };
//   return Joi.validate(user, schema);
// }


module.exports.User = User;
// module.exports.validateUser = validateUser;
// module.exports.validateUserUpdate = validateUserUpdate;
