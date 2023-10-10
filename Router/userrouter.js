const express = require("express");
const router = express.Router();

const {
  usersList,
  singleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../Modules/User/userController");


const {basicAuthentication} = require("../Middleware/basicAuthentication")
// providing  users routes here
router.route("/").get(usersList);
router.route("/:id").get(basicAuthentication,singleUser);
router.route("/").post(createUser);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);

module.exports = router;
