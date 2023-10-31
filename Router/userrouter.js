const express = require("express");
const router = express.Router();

const { basicAuthentication } = require("../Middleware/basicAuthentication");
const validateToken = require("../Middleware/jsonWebToken");

const {
  usersList,
  singleUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  userRegister,
} = require("../Modules/User/userController");


/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - name
 *         - password 
 *         - gmail
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           description: User's name
 *         password:
 *           type: string
 *           description: User's password
 *         email:
 *           type: string
 *           description: User's email
 *         phone:
 *           type: string
 *           description: User's phone number
 *       example:
 *         id: BCD123
 *         name: aaa
 *         password: aaa123
 *         gmail: aaa123@gmail.com
 *         phone: 111222333
 */

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Users all APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: User list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       '500':
 *         description: Internal server error
 * /users/add:
 *   post:
 *     summary: Add a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       '200':
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       '500':
 *         description: Internal server error
 * /users/edit/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       '500':
 *         description: Internal server error

 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       '500':
 *         description: Internal server error
 */


router.route("/").get(validateToken, usersList);
router.route("/:id").get(basicAuthentication, singleUser);
router.route("/").post(createUser);
router.route("/:id").delete(validateToken, deleteUser);
router.route("/:id").put(validateToken, updateUser);

router.route("/login").post(loginUser);

router.route("/current/token").get(validateToken, userRegister);

module.exports = router;