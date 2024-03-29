const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields.')
    }
//duplicate check
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('This email is already registered!')
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //user creation
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    });

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            profileUrl:user.profileUrl,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('Please add all the fields!');
    }
    const user= await User.findOne({email});
    if(!user){
        res.status(400)
        throw new Error('No user found with this email!');
    }
    if(user.isBlocked){
        res.status(400)
        throw new Error('Your account is currently blocked!');
    }
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            profileUrl:user.profileUrl,
            token: generateToken(user._id)
        });
    }else{
        res.status(400)
        throw new Error('Incorrect password!');
    }
});

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async(req, res) =>{
    res.status(200).json(req.user);
});

//@desc Update user profile picture
//@route POST /api/users/profile/upload
//@access Private
const profileUpload = asyncHandler(async(req, res) =>{
    console.log("called the function the body",req.body)
    const url = req.body.url;
    const user = req.body.liveUser;
    console.log("the url==",url)
    console.log("the user==",user)
    await User.findByIdAndUpdate(user._id, {
        profileUrl: url
    });
    res.status(200).json(user);
});

//JWT generation
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d',
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    profileUpload,
};