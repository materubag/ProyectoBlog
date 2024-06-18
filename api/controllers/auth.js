import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Usuario no encontrado");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Usuario o contraseña incorrectos");

    const token = jwt.sign({ id: data[0].id,mod: data[0].mod }, "jwtkeyyyyyy");
    const { password,telf, ...other } = data[0];

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })
      .status(200)
      .json(other);
  });
};

export const UpdateTelf = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ? AND visible = 1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Usuario no encontrado o no aprovado");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Usuario o contraseña incorrectos");

    const updateQuery = "UPDATE users SET telf = ? WHERE username = ?";
    db.query(updateQuery, [req.body.telf, req.body.username], (updateErr, updateData) => {
      if (updateErr) return res.status(500).json(updateErr);
      res.status(201).json("Usuario registrado con éxito");
    });
  });
};

export const updateProfile = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No autenticado!");

  jwt.verify(token, "jwtkeyyyyyy", (err, userInfo) => {
    if (err) return res.status(403).json("El token no es válido!");

    const userId = req.params.id;
    const { username, newPassword, img } = req.body;

    const q = "SELECT * FROM users WHERE username = ? AND id != ?";
    db.query(q, [username, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("El nombre de usuario ya está en uso");

      let updateQuery = "UPDATE users SET `visible` = 0,";
      const updateValues = [];

      if (username) {
        updateQuery += "`username` = ?, ";
        updateValues.push(username);
      }

      if (newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        updateQuery += "`password` = ?, ";
        updateValues.push(hash);
      }

      if (img) {
        updateQuery += "`img` = ?, ";
        updateValues.push(img);
      }

      updateQuery = updateQuery.slice(0, -2);
      updateQuery += " WHERE `id` = ?";
      updateValues.push(userId);

      db.query(updateQuery, updateValues, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Perfil actualizado correctamente.");
      });
    });
  });
};


export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
};
