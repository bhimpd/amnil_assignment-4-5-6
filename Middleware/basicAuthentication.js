const User = require("../Model/users");
const bcrypt = require("bcrypt");

exports.basicAuthentication = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({ error: "No token provided..." });
  }

  const decoded = Buffer.from(token, "base64").toString("utf-8");
  // Extract the name and password from the credentials
  const [name, password] = decoded.split(":");

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: username and token didnot matchedd..." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.user = user;
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid username and password..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
