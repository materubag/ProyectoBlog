import { db } from "../db.js";

export const getInvisibleUsers = (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE visible = 0 AND id != ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const getInvisiblePosts = (req, res) => {
  const userId = req.params.id;
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
  const userId = req.params.id;
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
  const userId = req.params.id;
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
  
  const userId = req.body.userId;
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

  const postId = req.body.postId;
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

  const commentId = req.body.commentId;
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

  const userId = req.body.userId;
  const sql = 'UPDATE users SET `mod` = 1 WHERE id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json(`User with ID ${userId} mod updated.`);
  });
};

export const refuseMod = (req, res) => {
  console.log("refuseMod called");

  const userId = req.body.userId;
  const sql = 'UPDATE users SET `telf` = NULL WHERE id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json(`User with ID ${userId} telf set to null.`);
  });
};

export const deletePost = (req, res) => {
  const postId = req.body.postId;
    const deleteCommentsQuery = "DELETE FROM comments WHERE `postid` = ?";
    db.query(deleteCommentsQuery, [postId], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Failed to delete comments related to the post!");
      }

      const deletePostQuery = "DELETE FROM posts WHERE `id` = ?";
      db.query(deletePostQuery, [postId], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Failed to delete post!");
        }

        return res.json("Post has been deleted along with its comments!");
      });
    });
};

export const deleteComment = (req, res) => {
  const commentId = req.body.commentId;

      const q = "DELETE FROM comments WHERE `id` = ?";
      db.query(q, [commentId], (err, data) => {
          if (err) {
              console.log(err)
              return res.status(403).json("Failed to delete comment!");
          }

          return res.json("Comment has been deleted!");
      });
};