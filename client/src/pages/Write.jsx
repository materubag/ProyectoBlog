import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import {BACK_URL} from "../config.js";

const Write = () => {
  const { currentUser } = useContext(AuthContext);
  const state = useLocation().state;
  axios.defaults.withCredentials = true;
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [img, setImg] = useState(state?.img || null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(`${BACK_URL}/api/upload`, formData);
        return res.data;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const deleteImage = async () => {
    try {
      if (img) {
        await axios.delete(`${BACK_URL}/api/delete-image/${encodeURIComponent(img)}`);
        console.log("Imagen eliminada del servidor:", img);
      }
    } catch (err) {
      console.error("Error al eliminar la imagen del servidor:", err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Debe iniciar sesión para publicar un post.");
      navigate("/login");
      return;
    }

    await deleteImage();

    const imgUrl = await upload();
    const finalImg = imgUrl || img;

    try {
      state
        ? await axios.put(`${BACK_URL}/api/posts/${state.id}`, {
          title,
          desc: content,
          cat,
          img: finalImg,
        })
        : await axios.post(`${BACK_URL}/api/posts/`, {
          title,
          desc: content,
          cat,
          img: finalImg,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            value={content}
            onChange={setContent}
            formats={Write.formats}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicación</h1>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Subir imagen
          </label>
          <div className="buttons">
            <button className="save">Save as a draft</button>
            <button onClick={handleClick}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categorias</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'cine'}
              name="cat"
              value="cine"
              id="cine"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Cine</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'art'}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Arte</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'science'}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Ciencia</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'music'}
              name="cat"
              value="music"
              id="music"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="music">Música</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'technology'}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Tecnologia</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'sports'}
              name="cat"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sports">Deportes</label>
          </div>
        </div>
      </div>
    </div>
  );
};

Write.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default Write;