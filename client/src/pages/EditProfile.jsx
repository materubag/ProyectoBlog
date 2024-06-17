import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(currentUser?.img || "");
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:8080/api/upload", formData);
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
        await axios.delete(`http://localhost:8080/api/delete-image/${encodeURIComponent(img)}`);
        console.log("Imagen eliminada del servidor:", img);
      }
    } catch (err) {
      console.error("Error al eliminar la imagen del servidor:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setErr("Las contraseñas no coinciden");
      return;
    }

    // Solo eliminar la imagen si realmente se ha cambiado
    const imgUrl = file ? await upload() : img;
    const data = { username, newPassword, img: imgUrl || img };

    try {
      // Solo eliminar la imagen si se ha cambiado
      if (file && img !== imgUrl) {
        await deleteImage();
      }

      const res = await axios.put(`http://localhost:8080/api/auth/updateProfile/${currentUser.id}`, data, {
        withCredentials: true
      });
      setMsg(res.data);
      if (imgUrl) {
        setImg(imgUrl); // Actualizar la imagen en el estado local
      }
    } catch (err) {
      setErr(err.response?.data || "Error al actualizar el perfil");
    }
  };

  if (!currentUser) {
    return (
      <div className="edit-profile">
        <p>No estás logueado. Por favor, <Link to="/login">inicia sesión</Link> para editar tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <label className="avatar-label">
          Avatar:
          <input
            type="file"
            accept="image/*"
            name="avatar"
            className="avatar-input"
            onChange={handleFileChange}
          />
          <span className="file-input-text">Choose File</span>
        </label>
        <button type="submit">Save Changes</button>
        {err && <p>{err}</p>}
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
};

export default EditProfile;