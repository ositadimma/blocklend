const mongoose = require("mongoose");
const Fawn = require("fawn");
const winston = require("winston");

module.exports = function () {
const db= 'mongodb+srv://kyriannkay:KEqBKyeusa6Yb2Qu@cluster0.3dbf7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
  mongoose
    .connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
    }
    )
    .then(() => console.log('connected to database'));

  // Fawn.init(mongoose, "pp_fawn");
  //winston.info(`Connected to live database ...`)
};

//test Database
//"db": "mongodb+srv://awoof:passworded@awoof.xshqy.mongodb.net/test"

// live db
// `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@awoofcluster-tetxw.mongodb.net/awoof?retryWrites=true&w=majority`,
// { useNewUrlParser: true, useUnifiedTopology: true }
