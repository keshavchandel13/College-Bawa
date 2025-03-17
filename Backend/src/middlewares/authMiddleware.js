const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    // Verify the token using the secret from the .env file
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user to the request object
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Send a specific error if the token is invalid or expired
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
