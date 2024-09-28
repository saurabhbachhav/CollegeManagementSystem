// authMiddleware.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "iiitn";
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.sendStatus(401); 

  jwt.verify(token, SECRET_KEY, (err, user) => {
    // Verify token
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
