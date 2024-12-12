// //middlewares
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
// const super_admin = require("../middleware/superAdmin");
// const validateObjectId = require("../middleware/validateObjectId");

// //models
// const { Admin } = require("../models/admin");
// const { User, validateUser } = require("../models/user");
// const { Teacher } = require("../models/teacher");
// const { Token } = require("../models/token");
// const { PasswordResetToken } = require("../models/passwordResetToken");

// //plugins
// const uniqid = require("uniqid");
// const util = require("util");
// const mongoose = require("mongoose");
// const _ = require("lodash");
// const express = require("express");
// const router = express.Router();
// const uniqueRandom = require("unique-random");
// const random = uniqueRandom(0, 10);
// const { celebrate, Joi } = require("celebrate");
// const Helpers = require("../Helpers/helpers");
// const Fawn = require("fawn");

// mongoose.set("useFindAndModify", false);

// // Image Upload things
// const multer = require("multer");
// const { ObjectId } = require("mongodb");
// const { Student } = require("../models/student");
// const { TeacherInfo } = require("../models/teacherInfo");
// const { FormTeacher } = require("../models/formTeacher");


// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only jpeg/png/jpg/pdf are allowed!"), false);
//   }
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/users/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// router.get("/get_subjects", /*auth,*/ async (req, res) => {
//   const subjects = await TeacherInfo.find({teacher: req.user.id});

//   let result = { status: "success", error: false, data: subjects };
//   res.send(result);
// });


// router.get("/get_subjects_students/:id",/* auth,*/ async (req, res) => {
//   var students= []
//   const studentScores = await Score.find({ subjectId: req.params.id, studentClass: req.body.class });
//   for (let index = 0; index < studentScores.length; index++) {
//     var student= await Student.findOne({_id: studentScores[index].studentId});
//     var studentObj= {
//       student: student,
//       scoreInfo: studentScores[index]
//     }
//     students= [...students, studentObj]
//   }

//   let result = { status: "success", error: false, data: students };
//   res.send(result);
// });

// router.get("/formteacher/get_students",/* auth,*/ async (req, res) => {
//   var data=[]
//   const teacher = await FormTeacher.findOne({ userId: req.user.id });
//   const students = await Student.find({ specificClass: teacher.class });
//   for (let index = 0; index < students.length; index++) {
//     const user = await User.find({ _id: students[index].userId}).select("-__v -password");
//     var combined= {
//       user: user,
//       student: students[index]
//     }
//     data= [...data, combined]
//   }
//   let result = { status: "success", error: false, data: data };
//   res.send(result);
// });


// // router.get("/get_students/:id", [auth], async (req, res) => {
// //   const students = await Student.find({ subjects: { $all: [req.params.id] } }).select("-__v -password");
// //   var detail= []
// //   for (let index = 0; index < students.length; index++) {
// //     for (let i = 0; i < students[index].subjects.length; i++) {
// //       if(students[index].subjects[i].id==req.params.id){
// //         var tempObj= {
// //           firstName: students[index].firstName,
// //           lastName: students[index].lastName,
// //           subject: students[index].subjects[i]
// //         }
// //         detail= [...detail, tempObj]
// //       }  
// //     }  
// //   }
// //   let result = { status: "success", error: false, data: detail };
// //   res.send(result);
// // });


// // Get the currently logged-in admin; logged-in admin endpoint
// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.admin._id).select("-password -__v");
//   let result = { status: "success", error: false, data: user };
//   res.send(result);
// });

// module.exports = router;
