const express = require("express");
const router = express.Router();

const {
   addUsers,getAllUsers,getSingleUser,editUser,deleteUser
  } = require("../ModulesPostgres/user/userController");
  

  /**
 * @swagger
 * /apiusers/users:
 *  post:
 *     summary: Add a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */
router.route("/users").post(addUsers);


/**
* @swagger
* /apiusers/users:
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
*               $ref: '#/components/schemas/User'
*       '500':
*           description: Internal server error
*/
router.route("/users").get(getAllUsers);


/**
 * @swagger
 * /apiusers/singleuser/{id}:
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
 *               $ref: '#/components/schemas/User'
 *       '500':
 *        description: Internal server error
*/

router.route("/singleuser/:id").get(getSingleUser);


/**
 *  @swagger
  * /apiusers/edit/{id}:
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error

 */


router.route("/edit/:id").put(editUser);


/**
 *  @swagger
 * /apiusers/delete/{id}:
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

router.route("/delete/:id").delete(deleteUser);

module.exports = router;