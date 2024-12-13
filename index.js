const winston = require("winston");
const express = require("express");
const http = require("http");
const app = express();
var cors = require("cors");
//const dotenv= require('dotenv');
require('dotenv').config()
const bodyParser = require('body-parser');
const session = require('express-session');
// const admin = require("./routes/admin");
const authroute = require("./routes/auth");
// const teachers = require("./routes/teachers");
// const students = require("./routes/students");



//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({ extended: false }));

//Express Session
app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true
}));
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors());
require("./startup/db")();
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
// app.use("/v1/parent", require("./routes/parents"));
// app.use("/v1/admins", require("./routes/admin"));
app.use("/v1/auth", require("./routes/auth"));
// app.use("/v1/teacher", require("./routes/teachers"));
// app.use("/v1/students", require("./routes/students"));

require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);




const myPort = process.env.PORT || 10000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.listen(myPort, (req, res) => {
    console.log(`App is on port ${myPort}`);
});








































































// app.use("/uploads", express.static("uploads"));

// var Fingerprint = require("express-fingerprint");

// dotenv.config({
//   path: ".env",
// });

// const auth = require("./middleware/auth");

// // const corsOptions ={
// //   origin:'*', 
// //   credentials:true,            //access-control-allow-credentials:true
// //   optionSuccessStatus:200,
// // }

// //app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });
// require("./startup/logging")();
// //require("./startup/routes")(app);
// app.use("/v1/parent", parents);
// app.use("/v1/admins", admin);
// app.use("/v1/auth", authroute);
// app.use("/v1/teacher", teachers);
// app.use("/v1/students", students);
// require("./startup/db")();

// require("./startup/config")();
// require("./startup/validation")();
// require("./startup/prod")(app);
// //app.use("/v1", routes);

// app.get("/", /* auth,*/ (req, res) => {
//   res.send("Awoof server is live...");
// });

// const serverr = http.createServer(app);
// const port = process.env.PORT || 10000;
// const server = serverr.listen(port, () =>
//   winston.info(`Listening on port ${port}...`)
// );

// module.exports = server;
