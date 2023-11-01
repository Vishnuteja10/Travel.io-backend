const jwt = require("jsonwebtoken");

const verifyuser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        res.status(403).json({ success: false, message: "invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.json({ success: false, message: "Please login first" });
  }
};

module.exports = verifyuser;
