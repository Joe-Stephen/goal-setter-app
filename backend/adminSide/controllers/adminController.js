const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const User = require("../../userSide/models/userModel");

//@desc verify admin login details
//@route POST /api/admin
//@access Public
const postAdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all the fields!");
  }
  const admin = await Admin.findOne({ email });
  console.log(admin);

  if (!admin) {
    res.status(400);
    throw new Error("No admin found with this email!");
  }
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect password!");
  }
});

//@desc get users list
//@route GET /api/admin/
//@access Private
const getUsersList = asyncHandler(async (req, res) => {
  const users = await User.find()
  if(users) {
      res.status(200).json({users})
  } else {
      res.status(404)
      throw new Error('Users Not Found')
  }
});

//@desc delete a user
//@route DELETE /api/admin/:userId
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new error("No user found!");
  }
  await user.deleteOne();
  res.status(200).json({ id: req.params.userId });
});

//@desc update user details
//@route PUT /api/admin/:userId
//@access Private
const updateUserDetails = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Add all the fields!");
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  //duplicate email id check
  const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
  if (emailExists) {
    res.status(404);
    throw new Error("This email is already registered!");
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //updating user details
  await User.findByIdAndUpdate(req.params.userId, {
    name,
    email,
    password: hashedPassword,
  });

  res.status(200).json("User details updated");
});

//@desc search for a user
//@route POST /api/admin/search
//@access Private
const searchUser = asyncHandler(async (req, res) => {
  const query = req.body.query;
  const regex = new RegExp(`^${query}`, "i");
  const users = await User.find({ name: { $regex: regex } })
  res.status(200).json(users);
});

//@desc toggle user status
//@route GET /api/admin/toggleStatus/userId
//@access Private
const toggleStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error("No user found!");
    }
    // Toggle the isBlocked status
    const newStatus = !user.isBlocked; 
    await User.findByIdAndUpdate(req.params.userId,{isBlocked:newStatus});

    res.status(200).json({message:'User status changed'});
  });

//JWT generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  postAdminLogin,
  getUsersList,
  searchUser,
  updateUserDetails,
  deleteUser,
  toggleStatus,
};
