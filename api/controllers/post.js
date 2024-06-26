import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat ? "SELECT * FROM posts WHERE cat=? AND visible=1" : "SELECT * FROM posts WHERE visible=1";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.visible,u.img AS userImg, `cat`,`date`,`uid` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? AND p.visible = 1 ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getPostsByUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM posts WHERE uid = ? AND visible=1";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.params.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
};



export const deletePost = (req, res) => {
  const postId = req.params.id;
  const { mod, id } = req.body;

  // Verificación de parámetros
  if (mod === undefined || id === undefined || postId === undefined) {
    return res.status(400).json("Missing required parameters");
  }
  if (mod === 1) {
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
  } else {
    const checkUserQuery = "SELECT * FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(checkUserQuery, [postId, id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error checking post ownership!");
      }

      if (data.length === 0) {
        return res.status(403).json("You can delete only your post!");
      }
      const deleteCommentsQuery = "DELETE FROM comments WHERE `postid` = ?";
      db.query(deleteCommentsQuery, [postId], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Failed to delete comments related to the post!");
        }
        const deletePostQuery = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(deletePostQuery, [postId, id], (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Failed to delete post!");
          }

          return res.json("Post has been deleted along with its comments!");
        });
      });
    });
  }
};

export const updatePost = (req, res) => {

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=?,`visible`=0 WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, req.body.currentId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
};
