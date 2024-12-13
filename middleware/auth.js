const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!process.env.requiresAuth) return next();
console.log('dhhd')
  const token = req.header("bl_auth_token");
  console.log('dhhd1')
  if (!token) return res.status(401).send("Access denied! No token provided");
  console.log('dhhd2')
  try {
    const decodedPayload = jwt.verify(token, process.env.jwtPrivateKey);
    console.log('dhhd3')
    req.user = decodedPayload;
    console.log('dhhd4')
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
