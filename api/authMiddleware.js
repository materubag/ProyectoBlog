import { db } from './db.js';

export const checkIfMod = (req, res, next) => {
  const currentId  = req.params.id;

  const sql = 'SELECT `mod` FROM users WHERE id = ?';
  db.query(sql, [currentId], (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json(err);
    }

    if (results.length > 0 && results[0].mod === 1) {
      next();
    } else {
      res.status(403).json("User is not a mod");
    }
  });
};