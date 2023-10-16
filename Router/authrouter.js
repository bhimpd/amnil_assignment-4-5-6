const express = require("express");
const router =express.Router();

const {FirebaseAuthenticationMiddleware} = require ("../Middleware/fireBaseAuthentication")
const {registerUser,loginUser,getUser}= require("../Modules/Auth/authController")

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getuser/:userId").get(FirebaseAuthenticationMiddleware,getUser);

module.exports = router;