const decodeJwt = require("./decodeJwt");

function createMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const decoded = decodeJwt(token);

  if (!decoded || !decoded.status) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  req.user = decoded;
  next();
}

module.exports = createMiddleware;
