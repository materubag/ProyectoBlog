import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { BACK_URL } from "../config.js";

const Write = () => {
  const { currentUser } = useContext(AuthContext);
  const state = useLocation().state;
  axios.defaults.withCredentials = true;
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [img, setImg] = useState(state?.img || null);
  const [titleWarning, setTitleWarning] = useState("");
  const [contentWarning, setContentWarning] = useState("");

  const currentId = currentUser ? currentUser.id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (title.split(' ').some(word => word.length > 35)) {
      setTitleWarning("El título contiene una palabra que excede los 35 caracteres.");
    } else if (title.length > 250) {
      setTitleWarning("El título no debe exceder los 250 caracteres.");
    } else {
      setTitleWarning("");
    }
  }, [title]);

  useEffect(() => {
    if (content.split(' ').some(word => word.length > 35)) {
      setContentWarning("La descripción contiene una palabra que excede los 35 caracteres.");
    } else if (content.length > 1000) {
      setContentWarning("La descripción no debe exceder los 1000 caracteres.");
    } else {
      setContentWarning("");
    }
  }, [content]);

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

    if (
      title.split(' ').some(word => word.length > 35) ||
      content.split(' ').some(word => word.length > 35) ||
      title.length > 250 ||
      content.length > 1000
    ) {
      alert("El título o la descripción no cumplen con las restricciones de longitud.");
      return;
    }

    if (!title && !content) {
      alert("El título y la descripción no pueden estar ambos vacíos.");
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
          currentId,
        })
        : await axios.post(`${BACK_URL}/api/posts/${currentId}`, {
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
        {titleWarning && <p style={{ color: 'red' }}>{titleWarning}</p>}
        <div className="editorContainer">
          <ReactQuill
            value={content}
            onChange={setContent}
            formats={Write.formats}
          />
        </div>
        {contentWarning && <p style={{ color: 'red' }}>{contentWarning}</p>}
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
          {['cine', 'art', 'science', 'music', 'technology', 'sports'].map(category => (
            <div className="cat" key={category}>
              <input
                type="radio"
                checked={cat === category}
                name="cat"
                value={category}
                id={category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
            </div>
          ))}
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