const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const adminSchema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 3,
    maxlength: 255,
  }, 
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const Admin = mongoose.model("Admin", adminSchema);

module.exports.Admin = Admin;
