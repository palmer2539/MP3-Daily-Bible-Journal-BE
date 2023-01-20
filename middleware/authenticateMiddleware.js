const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protectAPI = asyncHandler ( async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
      // verify token
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select("-password");

      next();

    } catch (error) {
      res.status(401);
      throw new Error ("User is not authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Entry is unauthorized, no token provided.")
  }
});

module.exports = { protectAPI };