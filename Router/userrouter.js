const express = require("express");
const router = express.Router();

const {
  usersList,
  singleUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  userRegister
} = require("../Modules/User/userController");


const {basicAuthentication} = require("../Middleware/basicAuthentication")
const validateToken = require("../Middleware/jsonWebToken")

// providing  users routes here
router.route("/").get(validateToken,usersList);
router.route("/:id").get(basicAuthentication,singleUser);
router.route("/").post(createUser);
router.route("/:id").delete(validateToken,deleteUser);
router.route("/:id").put(validateToken,updateUser);

router.route("/login").post(loginUser);
router.route("/current/token").get(validateToken,userRegister);


module.exports = router;
