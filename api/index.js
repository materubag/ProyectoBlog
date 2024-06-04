import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.get("/test", (req, res) => {
    res.json("Funciona Carajo");
});

app.listen(8080, () => {
    console.log("Conectado!!!!!!!");
});