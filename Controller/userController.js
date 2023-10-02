const express = require("express");
const User = require("../Model/users");


// to create the user data..

exports.createUser  = async(req,res)=>{
    try {
        const user = await User.create(req.body);
    
        return res.status(200).json({ user:user,message: "user created sucessfully..." });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

//to get all the users..
exports.usersList = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
  };


  //to fetch single user data....
exports.singleUser = async(req,res)=>{
    try {
        const { id } = req.params;
        const userid = await User.findById(id);
        if (!userid) {
          return res.status(404).json({ error: "user id not found..." });
        }
        res.status(200).json(userid);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

//to update the specific data..
exports.updateUser = async (req,res)=>{
    try {
        const { id } = req.params;
        const userid = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!userid) {
          return res.status(404).json({ error: "user id not found..." });
        }
        const userupdated = await User.findById(id);
        res.status(200).json(userupdated);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

//to search the id and delete the id..


exports.deleteUser = async (req,res)=>{
    try {
        const { id } = req.params;
        const userid = await User.findByIdAndDelete(id);
        if (!userid) {
           res.status(404).json({ error: "user id not found.." });
        }
        res.status(200).json(userid);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}