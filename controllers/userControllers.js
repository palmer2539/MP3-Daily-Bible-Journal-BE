const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utilities/genToken');



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error("A user with this email already exists.");
  }

  const user = await User.create({
    name, email, password
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Error!");
  };

  res.json({
    name, 
    email
  });
});


const authorizeUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password!");
}});

module.exports = {registerUser, authorizeUser};  