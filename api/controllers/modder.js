import { db } from "../db.js";

export const getInvisibleUsers = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM users WHERE visible = 0 AND id != ?';
  db.query(sql, [1], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const getInvisiblePosts = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM posts WHERE visible = 0 AND uid != ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const getInvisibleComments = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM comments WHERE visible = 0 AND uid != ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const getModReq = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM users WHERE `mod` = 0 AND telf IS NOT NULL AND id != ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const updateVisibleUser = (req, res) => {
  console.log("updateVisibleUser called");

  const userId = req.params.id;
  const sql = 'UPDATE users SET visible = 1 WHERE id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json(`User with ID ${userId} visibility updated.`);
  });
};

export const updateVisiblePost = (req, res) => {
  console.log("updateVisiblePost called");

  const postId = req.params.id;
  const sql = 'UPDATE posts SET visible = 1 WHERE id = ?';

  db.query(sql, [postId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json(`Post with ID ${postId} visibility updated.`);
  });
};

export const updateVisibleComment = (req, res) => {
  console.log("updateVisibleComment called");

  const commentId = req.params.id;
  const sql = 'UPDATE comments SET visible = 1 WHERE id = ?';

  db.query(sql, [commentId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json(`Comment with ID ${commentId} visibility updated.`);
  });
};

export const updateMod = (req, res) => {
  console.log("updateMod called");

  const userId = req.params.id;
  const sql = 'UPDATE users SET `mod` = 1 WHERE id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json(`User with ID ${userId} mod updated.`);
  });
};
