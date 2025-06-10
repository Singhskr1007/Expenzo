const User = require("../models/User")
const jwt=require("jsonwebtoken");

// Generate JWT token
const generateToken= (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn: "3h"});
};

// Register User
exports.registerUser=async(req,res) =>{

    const {fullname, email, password, profileImageUrl} = req.body;

    // Validation : Check For Missing Fiels
    if(!fullname || !email || !password)
    {
        return res.status(400).json({ message:"All Fields Are Required To Filled" });
    }
    try {
        // check if email already exists
        const existingUser= await User.findOne( {email} );
        if(existingUser)
        {
            return res.status(400).json( { message: "E-Mail Already Exists" });
        }

        // Create The User
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl,
        });

        return res.status(201).json({ 
            id:user._id,
            user,
            token:generateToken(user._id),
         });
    } 

    catch(err) {
        return res.status(400).json({ message: "Error Registering User", error:err.message });
    }
};

// Login User
exports.loginUser=async(req,res) =>{
    const { email, password } = req.body;
    if(!email || !password)
    {
        return res.status(400).json({ message:"All Fields Are Required" });
    }
    try {
        // Check If User Exists
        const user= await User.findOne({email});
        if(!user || !(await user.comparePassword(password)))
        {
            return res.status(400).json({ message: "Invalid Credentials / User Not Found" });
        }
        return res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });

    }
    catch(err)
    {
        return res.status(400).json({ message: "Error Registering User" , error:err.message});
    }

};

// GET User info
exports.getUserInfo=async(req,res) =>{
    try
    {
        const user= await User.findById(req.user.id).select("-password");

        if(!user)
        {
            return res.status(200).json({message:"User Not Found"});
        }
        return res.status(200).json(user);
    }
    catch(err)
    {
        return res.status(400).json({ message: "Error Registering User" , error:err.message});
    }
};