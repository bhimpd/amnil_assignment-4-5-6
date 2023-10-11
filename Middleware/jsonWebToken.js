const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ error: "Not authorized user..." });
      }
      console.log(decoded);
      // To pass the decoded data to the next middleware or route handler,we can pass it to the request object
      req.user = decoded.user;
      next();
    });
    
  } else {
    return res.status(401).json({ error: "Access token is missing or invalid." });
  }
};

module.exports = validateToken;





