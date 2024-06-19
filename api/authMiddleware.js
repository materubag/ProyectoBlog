import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const JWT_SECRET = "jwtkeyyyyyy";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    console.log("No token provided");
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Error verifying token:", err);
      return res.status(403).json("Token is not valid!");
    }
    
    req.user = user; // Cambiar userInfo a user
    next();
  });
};

export const checkIfMod = (req, res, next) => {
  const userId = req.user.id; // Cambiar userInfo a user
  
  const sql = 'SELECT `mod` FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json(err);
    }

    if (results.length > 0 && results[0].mod === 1) {
      next();
    } else {
      console.log("User is not a mod");
      res.status(403).json("User is not a mod");
    }
  });
};
