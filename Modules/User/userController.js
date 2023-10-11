const User = require("../../Model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// to create the user data..

exports.createUser = async (req, res) => {
  try {
    const { name, password, gmail, phone } = req.body;
    if (!name || !password || !gmail || !phone) {
      return res.status(404).json({ error: "all fields required..." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    //  console.log(hashPassword);

    const user = await User.create({
      name,
      password: hashPassword,
      gmail,
      phone,
    });

    const payload= {
      user:{
        name: user.name,
          gmail: user.gmail,
          id: user.id,
          phone: user.phone,
          password: user.password,
      }
    }
    const authToken =jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});

    return res
      .status(200)
      .json({  message: "user created sucessfully...",token: authToken, user:user});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//to get all the users..
exports.usersList = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//to fetch single user data....
exports.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userid = await User.findById(id);
    if (!userid) {
      return res.status(404).json({ error: "user id not found..." });
    }
    if (userid._id.toString() === req.user._id.toString()) {
      return res.status(200).json(userid);
    } else {
      return res
        .status(401)
        .json({ error: "Unauthorized: user ID dinot match the tokenn..." });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//to update the specific data..
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const idFromToken = decoded.user.id;

    if (idFromToken !== id) {
      return res.status(401).json({ error: "unauthoriized user..." });
    }
    const userid = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!userid) {
      return res.status(404).json({ error: "user id not found..." });
    }
    const userupdated = await User.findById(id);
    return res.status(200).json(userupdated);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//to search the id and delete the id..

exports.deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Extract the user ID from the JWT token in the request
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userIdFromToken = decoded.user.id;

    // Check if the user ID from the token matches the requested user ID
    if (userIdFromToken !== id) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized access." });
  }
};

// login the user..
exports.loginUser = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    if (!gmail || !password) {
      return res.status(400).json("both field are required...");
    }
    const user = await User.findOne({ gmail });
    const comparedPassword = await bcrypt.compare(password, user.password);

    if (user && comparedPassword) {
      const payload = {
        user: {
          name: user.name,
          gmail: user.gmail,
          id: user.id,
          phone: user.phone,
          password: user.password,
        },
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "60m",
      });
      return res.status(200).json({ accessToken });
    } else {
      return res.status(200).json({ error: "unmatched credential..." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//register the userr...

exports.userRegister = async (req, res) => {
  // ... your userRegister logic ...
  return res.status(200).json(req.user);
};
