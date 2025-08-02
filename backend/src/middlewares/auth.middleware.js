// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check agar token hai hi nahi
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  // 2. Token extract karo
  const token = authHeader.split(" ")[1];

  // 3. Try token verify karna
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // user info request mein attach karo
    next(); // move to next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { verifyToken };
