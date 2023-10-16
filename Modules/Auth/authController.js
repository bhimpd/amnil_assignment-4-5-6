const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const cors = require("cors");

const { User } = require("../../config/admin");

exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    console.log("userRecord:", userRecord);

    // Creating user object for Firestore
    const userObject = {
      email: userRecord.email,
      username: userRecord.displayName,
    };

    // Store user data in Firestore
    await User.add(userObject);
    res.json({ user: userObject });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }
    const userRecord = await admin.auth().getUserByEmail(email);

    const isPasswordValid = bcrypt.compare(password, userRecord.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const idToken = await admin.auth().createCustomToken(userRecord.uid);

    return res.json({ idToken });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid email or password." });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await admin.auth().getUser(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
