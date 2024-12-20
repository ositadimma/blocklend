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
const mainroute = require("./routes/main");
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


app.use("/v1/auth", require("./routes/auth"));
app.use("/v1/main", require("./routes/main"));

require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);




const myPort = process.env.PORT || 10000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.listen(myPort, (req, res) => {
    console.log(`App is on port ${myPort}`);
});







































































