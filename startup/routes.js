const express = require("express");
const parents = require("../routes/parents");
const admin = require("../routes/admin");
const auth = require("../routes/auth");
const main = require("../routes/main");
const teachers = require("../routes/teachers");
const students = require("../routes/students");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());

  app.use("/v1/admins", admin);
  app.use("/v1/auth", auth);
  app.use("/v1/main", main);

  // Express Error Middleware function is passed after all the existing middleware functions
  app.use(error);
};
