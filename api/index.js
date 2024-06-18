import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import modderRoutes from "./routes/modders.js"
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import multer from "multer";
import path from "path"; 
import fs from "fs";

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.delete("/api/delete-image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join("../client/public/upload", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error al eliminar la imagen:", err);
      res.status(500).json({ error: "Error al eliminar la imagen" });
    } 
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/modders", modderRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes); 

app.get("/test", (req, res) => {
    res.json("Funciona ");
});

app.listen(8080, () => {
    console.log("Conectado!!!!!!!");
});