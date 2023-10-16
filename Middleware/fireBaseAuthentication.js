const { admin } = require("../config/admin");

exports.FirebaseAuthenticationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .send("Access denied. authorized user not found no found..");
    }
    const customToken = authHeader.split(" ")[1];

    console.log("Received Token:", customToken);

    if (customToken) {
      const decodedToken = await admin.auth().verifyIdToken(customToken);
      if (decodedToken) {
        req.user = decodedToken;
      next();
      }
      return res.status(401).send("Access denied. Invalid token");      
    }
    return res.status(401).send("Access denied. No token provided");
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid token");
  }
};
