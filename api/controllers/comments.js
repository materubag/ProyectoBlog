import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
    const q = "SELECT c.id, c.comentario, c.date, c.uid, u.username, u.img AS userImg FROM comments c JOIN users u ON c.uid = u.id WHERE c.postid = ? AND c.visible = 1 AND u.visible = 1 ORDER BY c.date DESC";

    db.query(q, [req.params.postid], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
    const q = "INSERT INTO comments(`comentario`, `date`, `uid`, `postid`) VALUES (?)";

    const values = [
        req.body.comentario,
        req.body.date,
        req.params.id,
        req.body.postid,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        return res.status(201).json("Comment has been created.");
    });
};

export const deleteComment = (req, res) => {

        const id =req.body.id;
        const mod=req.body.mod;
        const commentId = req.params.id;

        if (mod === 1) {
            const q = "DELETE FROM comments WHERE `id` = ?";
            db.query(q, [commentId], (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(403).json("Failed to delete comment!");
                }

                return res.json("Comment has been deleted!");
            });
        } else {
            const q = "DELETE FROM comments WHERE `id` = ? AND `uid` = ?";
            db.query(q, [commentId, id], (err, data) => {
                if (err) return res.status(403).json("You can delete only your comment!");

                return res.json("Comment has been deleted!");
            });
        }
};

export const updateComment = (req, res) => {
        const commentId = req.params.id;
        const q = "UPDATE comments SET `comentario` = ?,`visible` = 0 WHERE `id` = ? AND `uid` = ?";

        db.query(q, [req.body.comentario,commentId, req.body.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) return res.status(403).json("You can update only your comment!");
            return res.json("Comment has been updated.");
        });
};